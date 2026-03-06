import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getAppSettings: () => ipcRenderer.invoke('get-app-settings'),
  getRecentlyAdded: () => ipcRenderer.invoke('get-recently-added'),
  getMovies: () => ipcRenderer.invoke('get-movies'),
  getTvShows: () => ipcRenderer.invoke('get-tv-shows'),
  openFile: (filePath: string) => ipcRenderer.invoke('open-file', filePath)
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
