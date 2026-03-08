import { app } from 'electron'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { Settings } from '../shared/types'

const defaultSettings: Settings = {
  theme: 'system',
  moviesDirectory: '',
  tvShowsDirectory: '',
  tmdbApiKey: ''
}

const settingsPath = join(app.getPath('userData'), 'settings.json')

export const getSettings = (): Settings => {
  try {
    return JSON.parse(readFileSync(settingsPath, 'utf-8'))
  } catch {
    return defaultSettings
  }
}

export const setSettings = (settings: Settings): void =>
  writeFileSync(settingsPath, JSON.stringify(settings, null, 2))
