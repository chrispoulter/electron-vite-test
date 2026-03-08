import React, { useEffect } from 'react'
import type { Movie, TvShow } from '../../../shared/types'
import { MovieCard } from './MovieCard'
import { TvShowCard } from './TvShowCard'

export const RecentlyAddedView = (): React.JSX.Element => {
  const [search, setSearch] = React.useState('')
  const [recentlyAdded, setRecentlyAdded] = React.useState<(Movie | TvShow)[]>()

  useEffect(() => {
    window.api.getRecentlyAdded().then((items) => setRecentlyAdded(items))
  }, [])

  const filtered = recentlyAdded?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="dark:text-white">
      <h2 className="mb-4 text-2xl font-bold">Recently Added</h2>
      <input
        type="text"
        placeholder="Search recently added..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
      />
      {!filtered?.length ? (
        <div className="text-gray-500">
          {search
            ? 'No items match your search.'
            : 'No recently added items found. Check your Movies and TV Shows folders in Settings.'}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((item, index) => {
            if ('episodes' in item) {
              return <TvShowCard key={index} tvShow={item} showAddedDate />
            } else {
              return <MovieCard key={index} movie={item} showAddedDate />
            }
          })}
        </div>
      )}
    </div>
  )
}
