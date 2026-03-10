import React, { useEffect } from 'react'
import type { Movie } from '../../../shared/types'
import { SearchBar } from './SearchBar'
import { MovieCard } from './MovieCard'

export const MoviesView = (): React.JSX.Element => {
  const [search, setSearch] = React.useState('')
  const [movies, setMovies] = React.useState<Movie[]>()
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  useEffect(() => {
    window.api
      .getMovies()
      .then((movies) => setMovies(movies))
      .catch((e) => setError(e instanceof Error ? e.message : 'An unexpected error occurred'))
      .finally(() => setIsLoading(false))
  }, [])

  const filtered = movies?.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
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
      <h2 className="mb-4 text-2xl font-bold">Movies</h2>
      <SearchBar placeholder="Search movies..." value={search} onChange={setSearch} />
      {!filtered?.length ? (
        <div className="text-gray-500">
          {search
            ? 'No movies match your search.'
            : 'No movies found. Check your Movies folder in Settings.'}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
