import React, { useEffect } from 'react'
import type { TvShow } from '../../../shared/types'
import { SearchBar } from './SearchBar'
import { TvShowCard } from './TvShowCard'

export const TvShowsView = (): React.JSX.Element => {
  const [search, setSearch] = React.useState('')
  const [tvShows, setTvShows] = React.useState<TvShow[]>()
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  useEffect(() => {
    window.api
      .getTvShows()
      .then((tvShows) => setTvShows(tvShows))
      .catch((e) => setError(e instanceof Error ? e.message : 'An unexpected error occurred'))
      .finally(() => setIsLoading(false))
  }, [])

  const filtered = tvShows?.filter((show) =>
    show.title.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return (
      <p className="animate-pulse text-base font-medium text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800/50 dark:bg-red-900/20">
        <p className="font-medium text-red-700 dark:text-red-400">Something went wrong</p>
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="dark:text-white">
      <h2 className="mb-4 text-2xl font-bold">TV Shows</h2>
      <SearchBar placeholder="Search TV shows..." value={search} onChange={setSearch} />
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
