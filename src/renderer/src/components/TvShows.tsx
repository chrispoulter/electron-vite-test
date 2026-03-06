import React from 'react'

type TvShowEpisode = {
  episodeNumber: number
  filePath: string
}

type TvShowSeason = {
  seasonNumber: number
  episodes: TvShowEpisode[]
}

type TvShow = {
  title: string
  posterUrl: string
  seasons: TvShowSeason[]
}

export const TvShows = (): React.JSX.Element => {
  const [search, setSearch] = React.useState('')

  const [tvShows, setTvShows] = React.useState<TvShow[]>([
    {
      title: 'TV Show 1',
      posterUrl: 'https://placehold.co/150',
      seasons: [
        {
          seasonNumber: 1,
          episodes: [
            { episodeNumber: 1, filePath: '/path/to/episode1' },
            { episodeNumber: 2, filePath: '/path/to/episode2' }
          ]
        }
      ]
    }
  ])

  return (
    <div>
      <input
        type="text"
        placeholder="Search TV shows..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      {tvShows
        .filter((show) => show.title.toLowerCase().includes(search.toLowerCase()))
        .map((show, index) => (
          <div key={index} className="bg-gray-200 dark:bg-gray-800 p-4 rounded mb-4">
            <img src={show.posterUrl} alt={show.title} className="w-full h-auto mb-2 rounded" />
            <h3 className="text-lg font-bold">{show.title}</h3>
            {show.seasons.map((season) => (
              <div key={season.seasonNumber} className="ml-4 mt-2">
                <h4 className="text-md font-semibold">Season {season.seasonNumber}</h4>
                <ul className="list-disc list-inside">
                  {season.episodes.map((episode) => (
                    <li key={episode.episodeNumber}>Episode {episode.episodeNumber}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}
