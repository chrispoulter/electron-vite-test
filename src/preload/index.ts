import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { AppSettings, Movie, TvShow } from '../shared/types'

// Custom APIs for renderer
const api = {
  getAppSettings: (): Promise<AppSettings[]> => ipcRenderer.invoke('get-app-settings'),
  setAppSettings: (settings: AppSettings): Promise<void> =>
    ipcRenderer.invoke('set-app-settings', settings),
  getRecentlyAdded: (): Promise<(Movie | TvShow)[]> => ipcRenderer.invoke('get-recently-added'),
  getMovies: (): Promise<Movie[]> => ipcRenderer.invoke('get-movies'),
  getTvShows: (): Promise<TvShow[]> => ipcRenderer.invoke('get-tv-shows'),
  openFile: (filePath: string): Promise<void> => ipcRenderer.invoke('open-file', filePath)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
