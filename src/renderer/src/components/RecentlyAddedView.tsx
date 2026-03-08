import React, { useEffect } from 'react'
import type { Movie, TvShow } from '../../../shared/types'
import { MovieCard } from './MovieCard'
import { TvShowCard } from './TvShowCard'

export const RecentlyAddedView = (): React.JSX.Element => {
  const [recentlyAdded, setRecentlyAdded] = React.useState<(Movie | TvShow)[]>()

  useEffect(() => {
    window.api.getRecentlyAdded().then((items) => setRecentlyAdded(items))
  }, [])

  if (!recentlyAdded) {
    return <div className="text-gray-500">Loading...</div>
  }

  return (
    <div className="dark:text-white">
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
