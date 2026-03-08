import { useState } from 'react'
import type { TvShow } from '../../../shared/types'

export const TvShowCard = ({ tvShow }: { tvShow: TvShow }): React.JSX.Element => {
  const [showEpisodes, setShowEpisodes] = useState(false)

  return (
    <div className="bg-gray-200 dark:bg-gray-700 dark:text-white p-2 rounded flex flex-col gap-4">
      <div className=" flex gap-4 items-center">
        <img src={tvShow.posterUrl} alt={tvShow.title} className="w-full h-auto rounded max-w-8" />
        <h3 className="text-lg font-bold truncate">
          {tvShow.title}
          <br />
          <small className="p-1 bg-pink-500 text-white rounded text-xs">TV Show</small>
        </h3>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-auto cursor-pointer min-w-32"
          onClick={() => setShowEpisodes(!showEpisodes)}
        >
          Episodes
        </button>
      </div>
      {showEpisodes && (
        <div className="flex flex-col gap-1">
          {tvShow.episodes.map((episode, index) => (
            <div
              key={index}
              className="bg-gray-300 dark:bg-gray-600 dark:text-white p-2 rounded flex gap-2 items-center"
            >
              <span className="text-sm font-bold truncate">{episode.title}</span>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-auto cursor-pointer min-w-32"
                onClick={() => window.api.openFile(episode.filePath)}
              >
                Play
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
