export type Movie = {
  title: string
  posterUrl?: string
  filePath: string
  addedAt: number
}

type TvShowEpisode = {
  episodeNumber: number
  filePath: string
  addedAt: number
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
  moviesDirectory: string
  tvShowsDirectory: string
  tmdbApiKey: string
}
