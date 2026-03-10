import React, { useEffect } from 'react'
import type { Settings } from '../../../shared/types'
import { applyTheme } from '../utils/theme'

export const SettingsView = (): React.JSX.Element => {
  const [settings, setSettings] = React.useState<Settings>()
  const [isLoading, setIsLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState<string | null>(null)
  const [isSaving, setIsSaving] = React.useState(false)
  const [saveError, setSaveError] = React.useState<string | null>(null)

  useEffect(() => {
    window.api
      .getSettings()
      .then(setSettings)
      .catch((e) => setLoadError(e instanceof Error ? e.message : 'An unexpected error occurred'))
      .finally(() => setIsLoading(false))
  }, [])

  const onSaveSettings = (e: React.SubmitEvent): void => {
    e.preventDefault()
    setIsSaving(true)
    setSaveError(null)

    window.api
      .setSettings(settings!)
      .then(() => {
        applyTheme(settings!.theme)
      })
      .catch((e) => setSaveError(e instanceof Error ? e.message : 'An unexpected error occurred'))
      .finally(() => setIsSaving(false))
  }

  if (isLoading) {
    return (
      <p className="animate-pulse text-base font-medium text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    )
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800/50 dark:bg-red-900/20">
        <p className="font-medium text-red-700 dark:text-red-400">Something went wrong</p>
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">{loadError}</p>
      </div>
    )
  }

  if (!settings) {
    return <></>
  }

  return (
    <div className="dark:text-white">
      <h2 className="mb-4 text-2xl font-bold">Settings</h2>
      <p className="mb-4">Configure your application preferences here.</p>
      <form onSubmit={onSaveSettings}>
        <div className="mb-4">
          <label htmlFor="theme" className="mb-1 block text-sm font-medium">
            Theme
          </label>
          <select
            id="theme"
            value={settings.theme}
            onChange={(e) =>
              setSettings({ ...settings, theme: e.target.value as Settings['theme'] })
            }
            disabled={isSaving}
            className="mb-1 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="moviesDirectory" className="mb-1 block text-sm font-medium">
            Movie Directory
          </label>
          <input
            id="moviesDirectory"
            type="text"
            placeholder="/path/to/movies"
            value={settings.moviesDirectory}
            onChange={(e) => setSettings({ ...settings, moviesDirectory: e.target.value })}
            disabled={isSaving}
            required
            className="mb-1 w-full rounded border border-gray-400 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <p className="text-sm text-gray-400">Full path to the movies directory.</p>
        </div>
        <div className="mb-4">
          <label htmlFor="tvShowsDirectory" className="mb-1 block text-sm font-medium">
            TV Shows Directory
          </label>
          <input
            id="tvShowsDirectory"
            type="text"
            placeholder="/path/to/tv-shows"
            value={settings.tvShowsDirectory}
            onChange={(e) => setSettings({ ...settings, tvShowsDirectory: e.target.value })}
            disabled={isSaving}
            required
            className="mb-1 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <p className="text-sm text-gray-400">Full path to the TV shows directory.</p>
        </div>
        <div className="mb-4">
          <label htmlFor="tmdbApiKey" className="mb-1 block text-sm font-medium">
            TMDb API Key
          </label>
          <input
            id="tmdbApiKey"
            type="password"
            placeholder="Your TMDb API Key"
            value={settings.tmdbApiKey}
            onChange={(e) => setSettings({ ...settings, tmdbApiKey: e.target.value })}
            disabled={isSaving}
            className="mb-1 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <p className="text-sm text-gray-400">
            Enter your TMDb API key to enable metadata fetching.
          </p>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
        {saveError && (
          <p className="mt-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-400">
            {saveError}
          </p>
        )}
      </form>
    </div>
  )
}
