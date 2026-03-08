import React, { useEffect } from 'react'
import type { Movie } from '../../../shared/types'
import { MovieCard } from './MovieCard'

export const MoviesView = (): React.JSX.Element => {
  const [search, setSearch] = React.useState('')
  const [movies, setMovies] = React.useState<Movie[]>()

  useEffect(() => {
    window.api.getMovies().then((movies) => setMovies(movies))
  }, [])

  const filtered = movies?.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Movies</h2>
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      />
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
