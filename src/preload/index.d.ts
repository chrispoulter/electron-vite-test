import { ElectronAPI } from '@electron-toolkit/preload'
import type { AppSettings, Movie, TvShow } from '../shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getAppSettings: () => Promise<AppSettings>
      setAppSettings: (settings: AppSettings) => Promise<void>
      getRecentlyAdded: () => Promise<(Movie | TvShow)[]>
      getMovies: () => Promise<Movie[]>
      getTvShows: () => Promise<TvShow[]>
      openFile: (filePath: string) => Promise<void>
    }
  }
}
