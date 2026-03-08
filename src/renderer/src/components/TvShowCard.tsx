import type { TvShow } from '../../../shared/types'

export const TvShowCard = ({ tvShow }: { tvShow: TvShow }): React.JSX.Element => {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 dark:text-white p-4 rounded">
      <img
        src={tvShow.posterUrl}
        alt={tvShow.title}
        className="w-full h-auto mb-2 rounded  max-w-14"
      />
      <h3 className="text-lg font-bold">{tvShow.title}</h3>
      {tvShow.episodes.map((episode, index) => (
        <div
          key={index}
          className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
          onClick={() => window.api.openFile(episode.filePath)}
        >
          {episode.title}
        </div>
      ))}
    </div>
  )
}
