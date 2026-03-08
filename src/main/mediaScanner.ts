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
  return [
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
      title: 'TV Show 2',
      posterUrl: 'https://image.tmdb.org/t/p/w300/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
      seasons: [
        {
          seasonNumber: 1,
          episodes: [
            { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4', addedAt: Date.now() },
            { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4', addedAt: Date.now() }
          ]
        },
        {
          seasonNumber: 2,
          episodes: [
            { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4', addedAt: Date.now() },
            { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4', addedAt: Date.now() }
          ]
        }
      ]
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
