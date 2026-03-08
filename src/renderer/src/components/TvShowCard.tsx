import { useState } from 'react'
import defaultTvShowPoster from '../assets/default-tv-show.svg'
import type { TvShow } from '../../../shared/types'
import { ChevronDown, ChevronUp, PlayIcon } from './icons'
import { relativeTime } from '../utils/time'

export const TvShowCard = ({
  tvShow,
  showAddedDate
}: {
  tvShow: TvShow
  showAddedDate?: boolean
}): React.JSX.Element => {
  const [showEpisodes, setShowEpisodes] = useState(false)

  const latestAddedAt = showAddedDate
    ? Math.max(...tvShow.episodes.map((e) => e.addedAt))
    : undefined

  return (
    <div className="flex flex-col gap-4 rounded bg-gray-200 p-2 dark:bg-gray-700 dark:text-white">
      <div
        className="flex cursor-pointer items-center gap-4"
        onClick={() => setShowEpisodes(!showEpisodes)}
      >
        <img
          src={tvShow.posterUrl || defaultTvShowPoster}
          alt={tvShow.title}
          className="h-auto w-full max-w-8 rounded"
          onError={(e) => {
            e.currentTarget.src = defaultTvShowPoster
            e.currentTarget.onerror = null
          }}
        />
        <div>
          <h3 className="truncate font-bold">{tvShow.title}</h3>
          {latestAddedAt && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {relativeTime(latestAddedAt)}
            </span>
          )}
        </div>
        <span className="ml-auto rounded bg-teal-500 p-1 px-2 py-1 text-xs text-white">
          TV Show
        </span>
        {showEpisodes ? (
          <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        )}
      </div>
      {showEpisodes && (
        <div className="flex flex-col gap-1">
          {tvShow.episodes.map((episode, index) => (
            <div
              key={index}
              onClick={() => window.api.openFile(episode.filePath)}
              className="flex cursor-pointer items-center gap-2 rounded bg-gray-100 p-2 dark:bg-gray-600 dark:text-white"
            >
              <span className="truncate text-sm">{episode.title}</span>
              <PlayIcon className="ml-auto h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
