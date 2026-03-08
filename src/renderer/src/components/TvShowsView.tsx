import React, { useEffect } from 'react'
import type { TvShow } from '../../../shared/types'
import { Search } from './Search'
import { TvShowCard } from './TvShowCard'

export const TvShowsView = (): React.JSX.Element => {
  const [search, setSearch] = React.useState('')
  const [tvShows, setTvShows] = React.useState<TvShow[]>()

  useEffect(() => {
    window.api.getTvShows().then((tvShows) => setTvShows(tvShows))
  }, [])

  const filtered = tvShows?.filter((show) =>
    show.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="dark:text-white">
      <h2 className="mb-4 text-2xl font-bold">TV Shows</h2>
      <Search placeholder="Search TV shows..." value={search} onChange={setSearch} />
      {!filtered?.length ? (
        <div className="text-gray-500">
          {search
            ? 'No shows match your search.'
            : 'No TV shows found. Check your TV Shows folder in Settings.'}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((show, index) => (
            <TvShowCard key={index} tvShow={show} />
          ))}
        </div>
      )}
    </div>
  )
}
