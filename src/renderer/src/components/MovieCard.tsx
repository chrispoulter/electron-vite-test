import defaultMoviePoster from '../assets/default-movie.svg'
import type { Movie } from '../../../shared/types'
import { PlayIcon } from './icons'

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
        <small className="rounded bg-purple-500 p-1 text-xs text-white">Movie</small>
      </h3>
      <button className="ml-auto cursor-pointer rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
        <PlayIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
