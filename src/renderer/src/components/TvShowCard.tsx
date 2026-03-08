import { useState } from 'react'
import defaultTvShowPoster from '../assets/default-tv-show.svg'
import type { TvShow } from '../../../shared/types'
import { ChevronDown, ChevronUp, PlayIcon } from './icons'
import { relativeTime } from '../utils/time'

const getSeasonCount = (episodes: TvShow['episodes']): number => {
  const seasons = new Set<number>()
  for (const ep of episodes) {
    const match = ep.title.match(/\bS(\d+)/i) ?? ep.title.match(/\bSeason\s*(\d+)/i)
    if (match) seasons.add(Number(match[1]))
  }
  return seasons.size
}

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

  const seasonCount = getSeasonCount(tvShow.episodes)
  const episodeCount = tvShow.episodes.length

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
        <div className="truncate">
          <h3 className="font-bold">{tvShow.title}</h3>
          {latestAddedAt && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {relativeTime(latestAddedAt)}
            </span>
          )}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {seasonCount} {seasonCount === 1 ? 'Season' : 'Seasons'} · {episodeCount}{' '}
            {episodeCount === 1 ? 'Episode' : 'Episodes'}
          </span>
          <span className="rounded bg-teal-500 p-1 px-2 py-1 text-xs text-nowrap text-white">
            TV Show
          </span>
          {showEpisodes ? (
            <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </div>
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
              <small className="ml-auto rounded bg-gray-500 px-2 py-1 text-xs text-white">
                {episode.filePath.split('.').pop()?.toUpperCase() ?? ''}
              </small>
              <PlayIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
