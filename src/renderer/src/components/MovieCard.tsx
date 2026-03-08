import defaultMoviePoster from '../assets/default-movie.svg'
import type { Movie } from '../../../shared/types'

export const MovieCard = ({ movie }: { movie: Movie }): React.JSX.Element => {
  return (
    <div
      onClick={() => window.api.openFile(movie.filePath)}
      className="flex cursor-pointer items-center gap-4 rounded bg-gray-200 p-2 dark:bg-gray-700 dark:text-white"
    >
      <img
        src={movie.posterUrl || defaultMoviePoster}
        alt={movie.title}
        className="h-auto w-full max-w-8 rounded"
        onError={(e) => {
          e.currentTarget.src = defaultMoviePoster
          e.currentTarget.onerror = null
        }}
      />
      <h3 className="truncate text-lg font-bold">
        {movie.title}
        <br />
        <small className="rounded bg-teal-500 p-1 text-xs text-white">Movie</small>
      </h3>
      <button className="hover:bg-blue-600cursor-pointer ml-auto min-w-32 rounded bg-blue-500 px-4 py-2 text-white">
        Play
      </button>
    </div>
  )
}
