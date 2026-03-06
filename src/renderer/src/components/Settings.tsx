import React from 'react'

type AppSettings = {
  theme: 'light' | 'dark' | 'system'
  movieDirectory: string
  tvShowDirectory: string
  tmdbApiKey: string
}

export const Settings = (): React.JSX.Element => {
  const [theme, setTheme] = React.useState<AppSettings['theme']>('system')
  const [movieDirectory, setMovieDirectory] = React.useState('')
  const [tvShowDirectory, setTvShowDirectory] = React.useState('')
  const [tmdbApiKey, setTmdbApiKey] = React.useState('')

  const onThemeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedTheme = event.target.value as AppSettings['theme']
    setTheme(selectedTheme)
  }

  const onMoviesDirectoryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const directory = event.target.value
    setMovieDirectory(directory)
  }

  const onTvShowDirectoryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const directory = event.target.value
    setTvShowDirectory(directory)
  }

  const onTmdbApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const apiKey = event.target.value
    setTmdbApiKey(apiKey)
  }

  const onSaveSettings = (): void => {
    // Implement saving settings logic here
    alert('Settings saved!')
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <p className="mb-4">Configure your application preferences here.</p>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Theme</label>
        <select className="w-full border-gray-300 rounded" value={theme} onChange={onThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Movie Directory</label>
        <input
          type="text"
          className="w-full border-gray-300 rounded"
          placeholder="/path/to/movies"
          value={movieDirectory}
          onChange={onMoviesDirectoryChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">TV Show Directory</label>
        <input
          type="text"
          className="w-full border-gray-300 rounded"
          placeholder="/path/to/tv-shows"
          value={tvShowDirectory}
          onChange={onTvShowDirectoryChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">TMDb API Key</label>
        <input
          type="text"
          className="w-full border-gray-300 rounded"
          placeholder="Your TMDb API Key"
          value={tmdbApiKey}
          onChange={onTmdbApiKeyChange}
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={onSaveSettings}
      >
        Save Settings
      </button>
    </div>
  )
}
