import { useState } from 'react'
import defaultTvShowPoster from '../assets/default-tv-show.svg'
import type { TvShow } from '../../../shared/types'

export const TvShowCard = ({ tvShow }: { tvShow: TvShow }): React.JSX.Element => {
  const [showEpisodes, setShowEpisodes] = useState(false)

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
        <h3 className="truncate text-lg font-bold">
          {tvShow.title}
          <br />
          <small className="rounded bg-teal-500 p-1 text-xs text-white">TV Show</small>
        </h3>
        <button className="ml-auto min-w-32 cursor-pointer rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
          Episodes
        </button>
      </div>
      {showEpisodes && (
        <div className="flex flex-col gap-1">
          {tvShow.episodes.map((episode, index) => (
            <div
              key={index}
              onClick={() => window.api.openFile(episode.filePath)}
              className="flex cursor-pointer items-center gap-2 rounded bg-gray-100 p-2 dark:bg-gray-600 dark:text-white"
            >
              <span className="truncate text-sm font-bold">{episode.title}</span>
              <button className="ml-auto min-w-32 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                Play
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
