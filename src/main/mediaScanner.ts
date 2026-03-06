import { existsSync, readdirSync } from 'fs'
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
      filePath: 'D:\\Movies\\A\\Alien.mp4'
    },
    {
      title: 'TV Show 1',
      posterUrl: 'https://image.tmdb.org/t/p/w300/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
      seasons: [
        {
          seasonNumber: 1,
          episodes: [
            { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
            { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
          ]
        }
      ]
    },
    {
      title: 'Movie 2',
      posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
      filePath: 'D:\\Movies\\A\\Alien.mp4'
    },
    {
      title: 'TV Show 2',
      posterUrl: 'https://image.tmdb.org/t/p/w300/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
      seasons: [
        {
          seasonNumber: 1,
          episodes: [
            { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
            { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
          ]
        }
      ]
    },
    {
      title: 'Movie 3',
      posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
      filePath: 'D:\\Movies\\A\\Alien.mp4'
    },
    {
      title: 'TV Show 3',
      posterUrl: 'https://image.tmdb.org/t/p/w300/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
      seasons: [
        {
          seasonNumber: 1,
          episodes: [
            { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
            { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
          ]
        }
      ]
    }
  ]
}

export const getMovies = (): Movie[] => {
  const { movieDirectory } = getSettings()

  if (!existsSync(movieDirectory)) {
    return []
  }

  const files = readdirSync(movieDirectory, { recursive: true, withFileTypes: true })

  console.log(files)
  return files
    .filter((file) => file.isFile() && isVideoFile(file.name))
    .map((file) => ({
      title: parseTitle(file.name),
      posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
      filePath: `${file.parentPath}\\${file.name}`
    }))
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
            { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
            { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
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
            { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
            { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
          ]
        },
        {
          seasonNumber: 2,
          episodes: [
            { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
            { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
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
            { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
            { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
          ]
        }
      ]
    }
  ]
}
