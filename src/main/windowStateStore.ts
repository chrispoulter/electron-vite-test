import { app, BrowserWindow } from 'electron'
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

export const getWindowState = async (): Promise<WindowState> => {
  try {
    const data = await readFile(windowStatePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return defaultWindowState
  }
}

export const setWindowState = async (win: BrowserWindow): Promise<void> => {
  const isMaximized = win.isMaximized()
  const bounds = isMaximized ? win.getNormalBounds() : win.getBounds()
  const state: WindowState = {
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    isMaximized
  }

  await writeFile(windowStatePath, JSON.stringify(state, null, 2))
}
