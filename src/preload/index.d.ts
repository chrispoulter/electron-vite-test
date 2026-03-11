import { ElectronAPI } from '@electron-toolkit/preload'
import type { Settings, Movie, TvShow } from '../shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getSettings: () => Promise<Settings>
      setSettings: (settings: Settings) => Promise<void>
      getRecentlyAdded: () => Promise<(Movie | TvShow)[]>
      getMovies: () => Promise<Movie[]>
      getTvShows: () => Promise<TvShow[]>
      openFile: (filePath: string) => Promise<void>
      onPosterUpdated: (callback: (data: any) => void) => void
    }
  }
}
