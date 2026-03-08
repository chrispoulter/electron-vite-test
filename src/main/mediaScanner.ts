import { existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import { Movie, TvShow } from '../shared/types'
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

const parseEpisode = (fileName: string): { season: number; episode: number } | null => {
  const match = fileName.match(/S(\d+)E(\d+)/i)

  if (!match) {
    return null
  }

  return { season: parseInt(match[1], 10), episode: parseInt(match[2], 10) }
}

export const getRecentlyAdded = (): (Movie | TvShow)[] => {
  return [
    {
      title: 'Movie 1',
      posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
      filePath: 'D:\\Movies\\A\\Alien.mp4',
      addedAt: Date.now()
    },
    {
      title: 'TV Show 1',
      posterUrl: 'https://image.tmdb.org/t/p/w300/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
      seasons: [
        {
          seasonNumber: 1,
          episodes: [
            { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4', addedAt: Date.now() },
            { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4', addedAt: Date.now() }
          ]
        }
      ]
    },
    {
      title: 'Movie 2',
      posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
      filePath: 'D:\\Movies\\A\\Alien.mp4',
      addedAt: Date.now()
    },
    {
      title: 'TV Show 2',
      posterUrl: 'https://image.tmdb.org/t/p/w300/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
      seasons: [
        {
          seasonNumber: 1,
          episodes: [
            { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4', addedAt: Date.now() },
            { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4', addedAt: Date.now() }
          ]
        }
      ]
    },
    {
      title: 'Movie 3',
      posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
      filePath: 'D:\\Movies\\A\\Alien.mp4',
      addedAt: Date.now()
    },
    {
      title: 'TV Show 3',
      posterUrl: 'https://image.tmdb.org/t/p/w300/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
      seasons: [
        {
          seasonNumber: 1,
          episodes: [
            { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4', addedAt: Date.now() },
            { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4', addedAt: Date.now() }
          ]
        }
      ]
    }
  ]
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

    const seasonMap = new Map<
      number,
      { episodeNumber: number; filePath: string; addedAt: number }[]
    >()

    const showPath = join(tvShowsDirectory, folder.name)

    for (const file of readdirSync(showPath, { withFileTypes: true })) {
      if (!file.isFile() || !isVideoFile(file.name)) {
        continue
      }

      const episode = parseEpisode(file.name)

      if (!episode) {
        continue
      }

      const filePath = join(showPath, file.name)
      const addedAt = statSync(filePath).mtimeMs

      const episodes = seasonMap.get(episode.season) ?? []
      episodes.push({ episodeNumber: episode.episode, filePath, addedAt })
      seasonMap.set(episode.season, episodes)
    }

    if (seasonMap.size === 0) {
      continue
    }

    const seasons = [...seasonMap.entries()]
      .sort(([a], [b]) => a - b)
      .map(([seasonNumber, episodes]) => ({
        seasonNumber,
        episodes: episodes.sort((a, b) => a.episodeNumber - b.episodeNumber)
      }))

    tvShows.push({ title: folder.name, seasons })
  }

  return tvShows
}
