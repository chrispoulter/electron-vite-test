import { existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import { Movie, TvShow, TvShowEpisode } from '../shared/types'
import { getSettings } from './settingsStore'

const VIDEO_EXTENSIONS = new Set(['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.m4v', '.webm'])

const isVideoFile = (fileName: string): boolean => {
  const ext = fileName.slice(fileName.lastIndexOf('.')).toLowerCase()
  return VIDEO_EXTENSIONS.has(ext)
}

const parseTitle = (fileName: string): string => {
  const nameWithoutExt = fileName.slice(0, fileName.lastIndexOf('.'))
  return nameWithoutExt.replace(/\./g, ' ')
}

export const getRecentlyAdded = (): (Movie | TvShow)[] => {
  return []
}

export const getMovies = (): Movie[] => {
  const { moviesDirectory } = getSettings()

  if (!moviesDirectory || !existsSync(moviesDirectory)) {
    return []
  }

  const movies: Movie[] = []

  for (const folder of readdirSync(moviesDirectory, { withFileTypes: true })) {
    if (!folder.isDirectory()) {
      continue
    }

    const folderPath = join(moviesDirectory, folder.name)

    for (const file of readdirSync(folderPath, { withFileTypes: true })) {
      if (!file.isFile() || !isVideoFile(file.name)) {
        continue
      }

      const filePath = join(folderPath, file.name)

      movies.push({
        title: parseTitle(file.name),
        posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
        filePath,
        addedAt: statSync(filePath).mtimeMs
      })
    }
  }

  return movies
}

export const getTVShows = (): TvShow[] => {
  const { tvShowsDirectory } = getSettings()

  if (!tvShowsDirectory || !existsSync(tvShowsDirectory)) {
    return []
  }

  const tvShows: TvShow[] = []

  for (const folder of readdirSync(tvShowsDirectory, { withFileTypes: true })) {
    if (!folder.isDirectory()) {
      continue
    }

    const episodes: TvShowEpisode[] = []

    const folderPath = join(tvShowsDirectory, folder.name)

    for (const file of readdirSync(folderPath, { withFileTypes: true })) {
      if (!file.isFile() || !isVideoFile(file.name)) {
        continue
      }

      const filePath = join(folderPath, file.name)

      episodes.push({
        title: parseTitle(file.name),
        filePath,
        addedAt: statSync(filePath).mtimeMs
      })
    }

    if (episodes.length === 0) {
      continue
    }

    tvShows.push({
      title: folder.name,
      posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
      episodes
    })
  }

  return tvShows
}
