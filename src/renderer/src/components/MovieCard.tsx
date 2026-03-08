import type { Movie } from '../../../shared/types'

export const MovieCard = ({ movie }: { movie: Movie }): React.JSX.Element => {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 dark:text-white p-2 rounded flex gap-4 items-center">
      <img src={movie.posterUrl} alt={movie.title} className="w-full h-auto rounded max-w-8" />
      <h3 className="text-lg font-bold truncate">
        {movie.title}
        <br />
        <small className="p-1 bg-teal-500 text-white rounded text-xs">Movie</small>
      </h3>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-auto cursor-pointer min-w-32"
        onClick={() => window.api.openFile(movie.filePath)}
      >
        Play
      </button>
    </div>
  )
}
