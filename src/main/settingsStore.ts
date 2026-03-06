import { app } from 'electron'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { AppSettings } from '../shared/types'

const defaultSettings: AppSettings = {
  theme: 'system',
  movieDirectory: '',
  tvShowDirectory: '',
  tmdbApiKey: ''
}

const settingsPath = join(app.getPath('userData'), 'settings.json')

export const getSettings = (): AppSettings => {
  try {
    return JSON.parse(readFileSync(settingsPath, 'utf-8'))
  } catch {
    return defaultSettings
  }
}

export const setSettings = (appSettings: AppSettings): void =>
  writeFileSync(settingsPath, JSON.stringify(appSettings, null, 2))
