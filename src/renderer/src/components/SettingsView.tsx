import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Settings } from '../../../shared/types'
import { applyTheme } from '../utils/theme'

const directoryPathSchema = z.string().refine(
  (v) => {
    if (!v.trim()) {
      return true
    }

    return window.electron.process.platform === 'win32'
      ? /^[a-zA-Z]:[/\\]|^\\\\[^\\]+\\/.test(v)
      : v.startsWith('/')
  },
  {
    message:
      window.electron.process.platform === 'win32'
        ? 'Enter a full Windows path (e.g. C:\\Users\\me\\Movies or \\\\server\\share)'
        : 'Enter an absolute path starting with / (e.g. /home/me/Movies)'
  }
)

const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  moviesDirectory: directoryPathSchema,
  tvShowsDirectory: directoryPathSchema,
  tmdbApiKey: z.string()
})

export const SettingsView = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState<string | null>(null)
  const [saveError, setSaveError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Settings>({ resolver: zodResolver(settingsSchema) })

  useEffect(() => {
    window.api
      .getSettings()
      .then(reset)
      .catch((e) => setLoadError(e instanceof Error ? e.message : 'An unexpected error occurred'))
      .finally(() => setIsLoading(false))
  }, [reset])

  const onSaveSettings = async (data: Settings): Promise<void> => {
    setSaveError(null)
    try {
      await window.api.setSettings(data)
      applyTheme(data.theme)
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'An unexpected error occurred')
    }
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

  return (
    <div className="dark:text-white">
      <h2 className="mb-4 text-2xl font-bold">Settings</h2>
      <p className="mb-4">Configure your application preferences here.</p>
      <form onSubmit={handleSubmit(onSaveSettings)}>
        <div className="mb-4">
          <label htmlFor="theme" className="mb-1 block text-sm font-medium">
            Theme
          </label>
          <select
            id="theme"
            {...register('theme')}
            disabled={isSubmitting}
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
            {...register('moviesDirectory')}
            disabled={isSubmitting}
            className="mb-1 w-full rounded border border-gray-400 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          {errors.moviesDirectory ? (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.moviesDirectory.message}
            </p>
          ) : (
            <p className="text-sm text-gray-400">Full path to the movies directory.</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="tvShowsDirectory" className="mb-1 block text-sm font-medium">
            TV Shows Directory
          </label>
          <input
            id="tvShowsDirectory"
            type="text"
            placeholder="/path/to/tv-shows"
            {...register('tvShowsDirectory')}
            disabled={isSubmitting}
            className="mb-1 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          {errors.tvShowsDirectory ? (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.tvShowsDirectory.message}
            </p>
          ) : (
            <p className="text-sm text-gray-400">Full path to the TV shows directory.</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="tmdbApiKey" className="mb-1 block text-sm font-medium">
            TMDb API Key
          </label>
          <input
            id="tmdbApiKey"
            type="password"
            placeholder="Your TMDb API Key"
            {...register('tmdbApiKey')}
            disabled={isSubmitting}
            className="mb-1 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <p className="text-sm text-gray-400">
            Enter your TMDb API key to enable metadata fetching.
          </p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {isSubmitting ? 'Saving...' : 'Save Settings'}
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
