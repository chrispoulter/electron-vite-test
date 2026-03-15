import { app, BrowserWindow } from 'electron'
import log from 'electron-log/main'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

type WindowState = {
  width: number
  height: number
  x: number | undefined
  y: number | undefined
  isMaximized: boolean
}

const defaultWindowState: WindowState = {
  width: 1280,
  height: 730,
  x: undefined,
  y: undefined,
  isMaximized: false
}

const windowStatePath = join(app.getPath('userData'), 'window-state.json')

let windowState: WindowState = defaultWindowState

export const loadWindowState = async (): Promise<WindowState> => {
  try {
    const data = await readFile(windowStatePath, 'utf-8')
    windowState = JSON.parse(data)
  } catch (error) {
    log.error('Failed to load window state:', error)
  }

  return windowState
}

export const getWindowState = (): WindowState => windowState

export const setWindowState = async (win: BrowserWindow): Promise<void> => {
  const isMaximized = win.isMaximized()
  const bounds = isMaximized ? win.getNormalBounds() : win.getBounds()
  windowState = {
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    isMaximized
  }

  try {
    await writeFile(windowStatePath, JSON.stringify(windowState, null, 2))
  } catch (error) {
    log.error('Failed to save window state:', error)
  }
}
