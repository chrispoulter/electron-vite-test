import { app } from 'electron'
import log from 'electron-log/main'
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

let settings: Settings = defaultSettings

export const loadSettings = async (): Promise<Settings> => {
  try {
    const data = await readFile(settingsPath, 'utf-8')
    settings = { ...defaultSettings, ...JSON.parse(data) }
  } catch (error) {
    log.error('Failed to load settings:', error)
  }

  return settings
}

export const getSettings = (): Settings => settings

export const setSettings = async (newSettings: Settings): Promise<void> => {
  settings = newSettings

  try {
    await writeFile(settingsPath, JSON.stringify(settings, null, 2))
  } catch (error) {
    log.error('Failed to save settings:', error)
  }
}
