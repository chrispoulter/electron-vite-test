export type Movie = {
  title: string
  posterUrl?: string
  filePath: string
}

type TvShowEpisode = {
  episodeNumber: number
  filePath: string
}

type TvShowSeason = {
  seasonNumber: number
  episodes: TvShowEpisode[]
}

export type TvShow = {
  title: string
  posterUrl?: string
  seasons: TvShowSeason[]
}

export type AppSettings = {
  theme: 'light' | 'dark' | 'system'
  movieDirectory: string
  tvShowDirectory: string
  tmdbApiKey: string
}
