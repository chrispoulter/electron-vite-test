import React, { useEffect } from 'react'
import type { TvShow } from '../../../shared/types'
import { TvShowCard } from './TvShowCard'

export const TvShowsList = (): React.JSX.Element => {
  const [search, setSearch] = React.useState('')
  const [tvShows, setTvShows] = React.useState<TvShow[] | undefined>()

  useEffect(() => {
    window.api.getTvShows().then((tvShows) => setTvShows(tvShows))
  }, [])

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
        {(tvShows ?? [])
          .filter((show) => show.title.toLowerCase().includes(search.toLowerCase()))
          .map((show, index) => (
            <TvShowCard key={index} tvShow={show} />
          ))}
      </div>
    </div>
  )
}
