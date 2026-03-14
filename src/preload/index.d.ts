import { ElectronAPI } from '@electron-toolkit/preload'
import type { Settings, Movie, TvShow } from '../shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getAppVersion: () => Promise<string>
      openFile: (filePath: string) => Promise<void>
      getSettings: () => Promise<Settings>
      setSettings: (settings: Settings) => Promise<void>
      getRecentlyAdded: () => Promise<(Movie | TvShow)[]>
      getMovies: () => Promise<Movie[]>
      getTvShows: () => Promise<TvShow[]>
      onPosterUpdated: (callback: (data: PosterUpdate) => void) => () => void
    }
  }
}
