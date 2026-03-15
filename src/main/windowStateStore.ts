import { app, BrowserWindow } from 'electron'
import { readFileSync, writeFileSync } from 'fs'
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

export const getWindowState = (): WindowState => {
  try {
    const data = readFileSync(windowStatePath, 'utf-8')
    return { ...defaultWindowState, ...JSON.parse(data) }
  } catch (error) {
    console.error('Failed to load window state:', error)
    return defaultWindowState
  }
}

export const setWindowState = (win: BrowserWindow): void => {
  const isMaximized = win.isMaximized()
  const bounds = isMaximized ? win.getNormalBounds() : win.getBounds()

  const state: WindowState = {
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    isMaximized
  }

  try {
    writeFileSync(windowStatePath, JSON.stringify(state, null, 2))
  } catch (error) {
    console.error('Failed to save window state:', error)
  }
}
