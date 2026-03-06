import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
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
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('get-recently-added', () => {
    console.log('Getting recently added...')
    return [
      {
        title: 'Movie 1',
        posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
        filePath: 'D:\\Movies\\A\\Alien.mp4'
      },
      {
        title: 'TV Show 1',
        posterUrl: 'https://image.tmdb.org/t/p/w300/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
        seasons: [
          {
            seasonNumber: 1,
            episodes: [
              { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
              { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
            ]
          }
        ]
      },
      {
        title: 'Movie 2',
        posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
        filePath: 'D:\\Movies\\A\\Alien.mp4'
      },
      {
        title: 'TV Show 2',
        posterUrl: 'https://image.tmdb.org/t/p/w300/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
        seasons: [
          {
            seasonNumber: 1,
            episodes: [
              { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
              { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
            ]
          }
        ]
      },
      {
        title: 'Movie 3',
        posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
        filePath: 'D:\\Movies\\A\\Alien.mp4'
      },
      {
        title: 'TV Show 3',
        posterUrl: 'https://image.tmdb.org/t/p/w300/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
        seasons: [
          {
            seasonNumber: 1,
            episodes: [
              { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
              { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
            ]
          }
        ]
      }
    ]
  })

  ipcMain.handle('get-movies', () => {
    console.log('Getting movies...')
    return [
      {
        title: 'Movie 1',
        posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
        filePath: 'D:\\Movies\\A\\Alien.mp4'
      },
      {
        title: 'Movie 2',
        posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
        filePath: 'D:\\Movies\\A\\Movie2.mp4'
      },
      {
        title: 'Movie 3',
        posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
        filePath: 'D:\\Movies\\A\\Movie3.mp4'
      },
      {
        title: 'Movie 4',
        posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
        filePath: 'D:\\Movies\\A\\Movie4.mp4'
      },
      {
        title: 'Movie 5',
        posterUrl: 'https://image.tmdb.org/t/p/w300/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg',
        filePath: 'D:\\Movies\\A\\Movie5.mp4'
      }
    ]
  })

  ipcMain.handle('get-tv-shows', () => {
    console.log('Getting TV shows...')
    return [
      {
        title: 'TV Show 1',
        posterUrl: 'https://image.tmdb.org/t/p/w300/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
        seasons: [
          {
            seasonNumber: 1,
            episodes: [
              { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
              { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
            ]
          }
        ]
      },
      {
        title: 'TV Show 2',
        posterUrl: 'https://image.tmdb.org/t/p/w300/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
        seasons: [
          {
            seasonNumber: 1,
            episodes: [
              { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
              { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
            ]
          },
          {
            seasonNumber: 2,
            episodes: [
              { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
              { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
            ]
          }
        ]
      },
      {
        title: 'TV Show 3',
        posterUrl: 'https://image.tmdb.org/t/p/w300/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
        seasons: [
          {
            seasonNumber: 1,
            episodes: [
              { episodeNumber: 1, filePath: 'D:\\Movies\\A\\Alien.mp4' },
              { episodeNumber: 2, filePath: 'D:\\Movies\\A\\Alien.mp4' }
            ]
          }
        ]
      }
    ]
  })

  ipcMain.handle('open-file', (_, filePath: string) => {
    console.log(`Opening file: ${filePath}`)
    shell.openPath(filePath)
  })

  createWindow()

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
