import React from 'react'
import { MovieCard } from './MovieCard'

export type Movie = {
  title: string
  posterUrl: string
  filePath?: string
}

export const MoviesList = (): React.JSX.Element => {
  const [search, setSearch] = React.useState('')

  const [movies, setMovies] = React.useState<Movie[]>([
    { title: 'Movie 1', posterUrl: 'https://placehold.co/150', filePath: '/path/to/movie1' },
    { title: 'Movie 2', posterUrl: 'https://placehold.co/150', filePath: '/path/to/movie2' },
    { title: 'Movie 3', posterUrl: 'https://placehold.co/150', filePath: '/path/to/movie3' },
    { title: 'Movie 4', posterUrl: 'https://placehold.co/150', filePath: '/path/to/movie4' },
    { title: 'Movie 5', posterUrl: 'https://placehold.co/150', filePath: '/path/to/movie5' }
  ])

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="flex flex-col gap-2">
        {movies
          .filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))
          .map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
      </div>
    </div>
  )
}
