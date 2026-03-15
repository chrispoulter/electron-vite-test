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
    const data = readFileSync(settingsPath, 'utf-8')
    return { ...defaultSettings, ...JSON.parse(data) }
  } catch (error) {
    console.error('Failed to load settings:', error)
    return defaultSettings
  }
}

export const setSettings = (settings: Settings): void => {
  try {
    writeFileSync(settingsPath, JSON.stringify(settings, null, 2))
  } catch (error) {
    console.error('Failed to save settings:', error)
  }
}
