import React from 'react'
import { TvShowCard } from './TvShowCard'

type TvShowEpisode = {
  episodeNumber: number
  filePath: string
}

type TvShowSeason = {
  seasonNumber: number
  episodes: TvShowEpisode[]
}

export type TvShow = {
  title: string
  posterUrl?: string
  seasons: TvShowSeason[]
}

export const TvShowsList = (): React.JSX.Element => {
  const [search, setSearch] = React.useState('')

  const [tvShows, setTvShows] = React.useState<TvShow[]>([
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
  ])

  return (
    <div>
      <input
        type="text"
        placeholder="Search TV shows..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="flex flex-col gap-2">
        {tvShows
          .filter((show) => show.title.toLowerCase().includes(search.toLowerCase()))
          .map((show, index) => (
            <TvShowCard key={index} tvShow={show} />
          ))}
      </div>
    </div>
  )
}
