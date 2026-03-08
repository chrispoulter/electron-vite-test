import type { Movie } from '../../../shared/types'

export const MovieCard = ({ movie }: { movie: Movie }): React.JSX.Element => {
  return (
    <div className="flex items-center gap-4 rounded bg-gray-200 p-2 dark:bg-gray-700 dark:text-white">
      <img src={movie.posterUrl} alt={movie.title} className="h-auto w-full max-w-8 rounded" />
      <h3 className="truncate text-lg font-bold">
        {movie.title}
        <br />
        <small className="rounded bg-teal-500 p-1 text-xs text-white">Movie</small>
      </h3>
      <button
        className="hover:bg-blue-600cursor-pointer min-w-32 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => window.api.openFile(movie.filePath)}
      >
        Play
      </button>
    </div>
  )
}
