import React, { useEffect } from 'react'
import type { TvShow } from '../../../shared/types'
import { TvShowCard } from './TvShowCard'

export const TvShowsList = (): React.JSX.Element => {
  const [search, setSearch] = React.useState('')
  const [tvShows, setTvShows] = React.useState<TvShow[]>()

  useEffect(() => {
    window.api.getTvShows().then((tvShows) => setTvShows(tvShows))
  }, [])

  if (!tvShows) {
    return <div className="text-gray-500">Loading...</div>
  }

  return (
    <div className="dark:text-white">
      <h2 className="text-2xl font-bold mb-4">TV Shows</h2>
      <input
        type="text"
        placeholder="Search TV shows..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
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
