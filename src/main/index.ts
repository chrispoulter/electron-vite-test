import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { autoUpdater } from 'electron-updater'
import icon from '../../resources/icon.png?asset'
import type { Settings } from '../shared/types'
import { getSettings, setSettings } from './settingsStore'
import { getWindowState, setWindowState } from './windowStateStore'
import { getPosters } from './posterStore'
import { getMovies, getRecentlyAdded, getTvShows } from './mediaScanner'

// function setupAutoUpdater(): void {
//   // if (is.dev) return

//   autoUpdater.autoDownload = false
//   autoUpdater.autoInstallOnAppQuit = true
//   autoUpdater.logger = console

//   autoUpdater.on('update-available', (info) => {
//     dialog
//       .showMessageBox({
//         type: 'info',
//         title: 'Update Available',
//         message: `Version ${info.version} is available.`,
//         detail: 'Would you like to download and install it now?',
//         buttons: ['Download', 'Later'],
//         defaultId: 0,
//         cancelId: 1
//       })
//       .then((result) => {
//         if (result.response === 0) {
//           autoUpdater.downloadUpdate()
//         }
//       })
//   })

//   autoUpdater.on('update-downloaded', () => {
//     dialog
//       .showMessageBox({
//         type: 'info',
//         title: 'Update Ready',
//         message: 'Update downloaded.',
//         detail: 'The update will be installed when you restart the application. Restart now?',
//         buttons: ['Restart Now', 'Later'],
//         defaultId: 0,
//         cancelId: 1
//       })
//       .then((result) => {
//         if (result.response === 0) {
//           autoUpdater.quitAndInstall()
//         }
//       })
//   })

//   autoUpdater.on('error', (error) => {
//     console.error('AutoUpdater error:', error.message)
//   })

//   setTimeout(() => {
//     autoUpdater.checkForUpdates().catch((error) => {
//       console.error('Failed to check for updates:', error.message)
//     })
//   }, 3000)
// }

async function createWindow(): Promise<void> {
  const windowState = await getWindowState()

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    if (windowState.isMaximized) {
      mainWindow.maximize()
    }
    mainWindow.show()
  })

  mainWindow.on('close', () => {
    setWindowState(mainWindow)
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  await getPosters()

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // protocol.handle('poster', (request) => {
  //   const filePath = request.url.slice('poster://'.length).split('?')[0]

  //   return net.fetch(
  //     pathToFileURL(
  //       join(app.getPath('userData'), 'posters', decodeURIComponent(filePath))
  //     ).toString()
  //   )
  // })

  ipcMain.handle('get-settings', () => getSettings())
  ipcMain.handle('set-settings', (_, settings: Settings) => setSettings(settings))
  ipcMain.handle('get-recently-added', () => getRecentlyAdded())
  ipcMain.handle('get-movies', () => getMovies())
  ipcMain.handle('get-tv-shows', () => getTvShows())
  ipcMain.handle('open-file', (_, filePath: string) => shell.openPath(filePath))

  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
  // setupAutoUpdater()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
