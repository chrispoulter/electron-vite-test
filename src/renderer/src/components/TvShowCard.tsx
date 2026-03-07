import type { TvShow } from '../../../shared/types'

export const TvShowCard = ({ tvShow }: { tvShow: TvShow }): React.JSX.Element => {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 dark:text-white p-4 rounded">
      <img
        src={tvShow.posterUrl}
        alt={tvShow.title}
        className="w-full h-auto mb-2 rounded  max-w-14"
      />
      <h3 className="text-lg font-bold">{tvShow.title}</h3>
      {tvShow.seasons.map((season) => (
        <div key={season.seasonNumber} className="ml-4 mt-2">
          <h4 className="text-md font-semibold">Season {season.seasonNumber}</h4>
          <ul className="list-disc list-inside">
            {season.episodes.map((episode) => (
              <li
                key={episode.episodeNumber}
                onClick={() => window.api.openFile(episode.filePath)}
                className="cursor-pointer"
              >
                Episode {episode.episodeNumber}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
