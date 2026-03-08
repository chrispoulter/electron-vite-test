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
    return JSON.parse(readFileSync(windowStatePath, 'utf-8'))
  } catch {
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

  writeFileSync(windowStatePath, JSON.stringify(state, null, 2))
}
