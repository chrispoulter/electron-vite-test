import React from 'react'

type Movie = {
  title: string
  posterUrl: string
  filePath?: string
}

export const Movies = (): React.JSX.Element => {
  const [search, setSearch] = React.useState('')

  const [movies, setMovies] = React.useState<Movie[]>([
    { title: 'Movie 1', posterUrl: 'https://placehold.co/150', filePath: '/path/to/movie1' },
    { title: 'Movie 2', posterUrl: 'https://placehold.co/150', filePath: '/path/to/movie2' },
    { title: 'Movie 3', posterUrl: 'https://placehold.co/150', filePath: '/path/to/movie3' }
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies
          .filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))
          .map((movie, index) => (
            <div key={index} className="bg-gray-200 dark:bg-gray-800 p-4 rounded">
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-auto mb-2 rounded" />
              <h3 className="text-lg font-bold">{movie.title}</h3>
            </div>
          ))}
      </div>
    </div>
  )
}
