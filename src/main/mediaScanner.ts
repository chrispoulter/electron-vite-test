import { readdir, stat } from 'fs/promises'
import { extname, join } from 'path'
import { Movie, TvShow, TvShowEpisode } from '../shared/types'
import { getSettings } from './settingsStore'
import { getPosterUrlForMovie, getPosterUrlForTvShow } from './tmdbFetcher'

const VIDEO_EXTENSIONS = new Set(['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.m4v', '.webm'])

const isVideoFile = (fileName: string): boolean => {
  const ext = fileName.slice(fileName.lastIndexOf('.')).toLowerCase()
  return VIDEO_EXTENSIONS.has(ext)
}

const parseTitle = (fileName: string): string => {
  const nameWithoutExt = fileName.slice(0, fileName.lastIndexOf('.'))
  return nameWithoutExt.replace(/\./g, ' ')
}

export const getMovies = async (): Promise<Movie[]> => {
  console.log('Fetching movies from directory')

  const { moviesDirectory } = await getSettings()

  if (!moviesDirectory) {
    return []
  }

  const exists = await stat(moviesDirectory)
    .then((s) => s.isDirectory())
    .catch(() => false)

  if (!exists) {
    return []
  }

  const movies: Movie[] = []

  const folders = await readdir(moviesDirectory, { withFileTypes: true })

  for (const folder of folders) {
    if (!folder.isDirectory()) {
      continue
    }

    const folderPath = join(moviesDirectory, folder.name)

    const files = await readdir(folderPath, { withFileTypes: true })
    for (const file of files) {
      if (!file.isFile() || !isVideoFile(file.name)) {
        continue
      }

      const filePath = join(folderPath, file.name)
      const title = parseTitle(file.name)
      const posterUrl = await getPosterUrlForMovie(title)
      const fileExtension = extname(file.name)
      const { mtimeMs: addedAt } = await stat(filePath)

      movies.push({
        title,
        posterUrl,
        filePath,
        fileExtension,
        addedAt
      })
    }
  }

  return movies
}

export const getTvShows = async (): Promise<TvShow[]> => {
  console.log('Fetching TV shows from directory')

  // wait for 5 seconds to simulate loading state
  await new Promise((resolve) => setTimeout(resolve, 5000))

  const { tvShowsDirectory } = await getSettings()

  if (!tvShowsDirectory) {
    return []
  }

  const exists = await stat(tvShowsDirectory)
    .then((s) => s.isDirectory())
    .catch(() => false)

  if (!exists) {
    return []
  }

  const tvShows: TvShow[] = []

  const folders = await readdir(tvShowsDirectory, { withFileTypes: true })

  for (const folder of folders) {
    if (!folder.isDirectory()) {
      continue
    }

    const episodes: TvShowEpisode[] = []
    const seasons = new Set<number>()
    const folderPath = join(tvShowsDirectory, folder.name)

    const files = await readdir(folderPath, { withFileTypes: true })

    for (const file of files) {
      if (!file.isFile() || !isVideoFile(file.name)) {
        continue
      }

      const filePath = join(folderPath, file.name)
      const title = parseTitle(file.name)
      const fileExtension = extname(file.name)
      const { mtimeMs: addedAt } = await stat(filePath)

      const match = title.match(/\bS(\d+)/i)
      if (match) {
        seasons.add(Number(match[1]))
      }

      episodes.push({
        title,
        filePath,
        fileExtension,
        addedAt
      })
    }

    if (episodes.length === 0) {
      continue
    }

    const posterUrl = await getPosterUrlForTvShow(folder.name)
    const latestAddedAt = Math.max(...episodes.map((e) => e.addedAt))

    tvShows.push({
      title: folder.name,
      posterUrl,
      episodes,
      seasonCount: seasons.size,
      episodeCount: episodes.length,
      latestAddedAt
    })
  }

  return tvShows
}

export const getRecentlyAdded = async (): Promise<(Movie | TvShow)[]> => {
  console.log('Fetching recently added movies and TV shows')

  const [movies, tvShows] = await Promise.all([getMovies(), getTvShows()])

  const items: { item: Movie | TvShow; addedAt: number }[] = [
    ...movies.map((movie) => ({ item: movie, addedAt: movie.addedAt })),
    ...tvShows.map((tvShow) => ({
      item: tvShow,
      addedAt: tvShow.latestAddedAt
    }))
  ]

  return items
    .sort((a, b) => b.addedAt - a.addedAt)
    .slice(0, 20)
    .map(({ item }) => item)
}
