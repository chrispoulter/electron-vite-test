import React, { useEffect } from 'react'
import type { AppSettings } from '../../../shared/types'

export const Settings = (): React.JSX.Element => {
  const [appSettings, setAppSettings] = React.useState<AppSettings>()
  const [isSaving, setIsSaving] = React.useState(false)

  useEffect(() => {
    window.api.getAppSettings().then(setAppSettings)
  }, [])

  const onSaveSettings = (): void => {
    setIsSaving(true)

    window.api.setAppSettings(appSettings!).then(() => {
      setIsSaving(false)
    })
  }

  if (!appSettings) {
    return <div className="text-gray-500">Loading...</div>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <p className="mb-4">Configure your application preferences here.</p>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Theme</label>
        <select
          className="w-full border border-gray-300 rounded mb-1 p-2"
          value={appSettings.theme}
          onChange={(e) =>
            setAppSettings({ ...appSettings, theme: e.target.value as AppSettings['theme'] })
          }
          disabled={isSaving}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Movie Directory</label>
        <input
          type="text"
          className="w-full border border-gray-400 rounded mb-1 p-2"
          placeholder="/path/to/movies"
          value={appSettings.movieDirectory}
          onChange={(e) => setAppSettings({ ...appSettings, movieDirectory: e.target.value })}
          disabled={isSaving}
        />
        <p className="text-sm text-gray-400">Full path to the movie directory.</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">TV Show Directory</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded mb-1 p-2"
          placeholder="/path/to/tv-shows"
          value={appSettings.tvShowDirectory}
          onChange={(e) => setAppSettings({ ...appSettings, tvShowDirectory: e.target.value })}
          disabled={isSaving}
        />
        <p className="text-sm text-gray-400">Full path to the TV show directory.</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">TMDb API Key</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded mb-1 p-2"
          placeholder="Your TMDb API Key"
          value={appSettings.tmdbApiKey}
          onChange={(e) => setAppSettings({ ...appSettings, tmdbApiKey: e.target.value })}
          disabled={isSaving}
        />
        <p className="text-sm text-gray-400">
          Enter your TMDb API key to enable metadata fetching.
        </p>
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={onSaveSettings}
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save Settings'}
      </button>
    </div>
  )
}
