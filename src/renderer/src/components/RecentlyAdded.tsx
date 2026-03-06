import React from 'react'
import { Movie } from './MoviesList'
import { MovieCard } from './MovieCard'
import { TvShow } from './TvShowsList'
import { TvShowCard } from './TvShowCard'

type RecentlyAddedItem = Movie | TvShow

export const RecentlyAdded = (): React.JSX.Element => {
  const [recentlyAdded, setRecentlyAdded] = React.useState<RecentlyAddedItem[]>([
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
  ])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recently Added</h2>
      <div className="flex flex-col gap-2">
        {recentlyAdded.map((item, index) => {
          if ('seasons' in item) {
            return <TvShowCard key={index} tvShow={item} />
          } else {
            return <MovieCard key={index} movie={item} />
          }
        })}
      </div>
    </div>
  )
}
