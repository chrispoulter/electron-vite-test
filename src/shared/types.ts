export type Movie = {
  title: string
  posterUrl?: string
  filePath: string
  addedAt: number
}

export type TvShowEpisode = {
  title: string
  filePath: string
  addedAt: number
}

export type TvShow = {
  title: string
  posterUrl?: string
  episodes: TvShowEpisode[]
}

export type AppSettings = {
  theme: 'light' | 'dark' | 'system'
  moviesDirectory: string
  tvShowsDirectory: string
  tmdbApiKey: string
}
