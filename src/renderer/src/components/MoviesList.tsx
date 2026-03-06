import React from 'react'
import { MovieCard } from './MovieCard'

export type Movie = {
  title: string
  posterUrl?: string
  filePath: string
}

export const MoviesList = (): React.JSX.Element => {
  const [search, setSearch] = React.useState('')

  const [movies, setMovies] = React.useState<Movie[]>([
    {
      title: 'Movie 1',
      posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
      filePath: 'D:\\Movies\\A\\Alien.mp4'
    },
    {
      title: 'Movie 2',
      posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
      filePath: 'D:\\Movies\\A\\Movie2.mp4'
    },
    {
      title: 'Movie 3',
      posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
      filePath: 'D:\\Movies\\A\\Movie3.mp4'
    },
    {
      title: 'Movie 4',
      posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
      filePath: 'D:\\Movies\\A\\Movie4.mp4'
    },
    {
      title: 'Movie 5',
      posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
      filePath: 'D:\\Movies\\A\\Movie5.mp4'
    }
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
