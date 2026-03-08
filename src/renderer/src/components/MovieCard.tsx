import defaultMoviePoster from '../assets/default-movie.svg'
import type { Movie } from '../../../shared/types'
import { PlayIcon } from './icons'
import { relativeTime } from '../utils/time'

export const MovieCard = ({
  movie,
  showAddedDate
}: {
  movie: Movie
  showAddedDate?: boolean
}): React.JSX.Element => {
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
      <div className="truncate">
        <h3 className="font-bold">{movie.title}</h3>
        {showAddedDate && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {relativeTime(movie.addedAt)}
          </span>
        )}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <small className="rounded bg-purple-500 px-2 py-1 text-xs text-white">Movie</small>
        <small className="rounded bg-gray-500 px-2 py-1 text-xs text-white uppercase">
          {movie.fileExtension}
        </small>
        <PlayIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </div>
    </div>
  )
}
