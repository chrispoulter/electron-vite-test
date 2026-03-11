export type Movie = {
  title: string
  posterUrl?: string
  filePath: string
  fileExtension: string
  addedAt: number
}

export type TvShowEpisode = {
  title: string
  filePath: string
  fileExtension: string
  addedAt: number
}

export type TvShow = {
  title: string
  posterUrl?: string
  episodes: TvShowEpisode[]
  seasonCount: number
  episodeCount: number
  latestAddedAt: number
}

export type PosterUpdate = {
  title: string
  type: 'movie' | 'tv'
}

export type Settings = {
  theme: 'light' | 'dark' | 'system'
  moviesDirectory: string
  tvShowsDirectory: string
  tmdbApiKey: string
}
