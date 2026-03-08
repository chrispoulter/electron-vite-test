import { app } from 'electron'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import type { Settings } from '../shared/types'

const defaultSettings: Settings = {
  theme: 'system',
  moviesDirectory: '',
  tvShowsDirectory: '',
  tmdbApiKey: ''
}

const settingsPath = join(app.getPath('userData'), 'settings.json')

export const getSettings = async (): Promise<Settings> => {
  try {
    const data = await readFile(settingsPath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return defaultSettings
  }
}

export const setSettings = async (settings: Settings): Promise<void> =>
  await writeFile(settingsPath, JSON.stringify(settings, null, 2))
