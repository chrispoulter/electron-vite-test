import { useEffect } from 'react'
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult
} from '@tanstack/react-query'
import type { Movie, TvShow, Settings, PosterUpdate } from '../../../shared/types'
import { applyTheme } from '../utils/theme'

export const useMoviesQuery = (): UseQueryResult<Movie[]> =>
  useQuery({
    queryKey: ['movies'],
    queryFn: () => window.api.getMovies(),
    staleTime: Infinity
  })

export const useTvShowsQuery = (): UseQueryResult<TvShow[]> =>
  useQuery({
    queryKey: ['tv-shows'],
    queryFn: () => window.api.getTvShows(),
    staleTime: Infinity
  })

export const useRecentlyAddedQuery = (): UseQueryResult<(Movie | TvShow)[]> =>
  useQuery({
    queryKey: ['recently-added'],
    queryFn: () => window.api.getRecentlyAdded(),
    staleTime: Infinity
  })

export const useSettingsQuery = (): UseQueryResult<Settings> =>
  useQuery({
    queryKey: ['settings'],
    queryFn: () => window.api.getSettings(),
    staleTime: Infinity
  })

export const useSaveSettingsMutation = (): UseMutationResult<void, Error, Settings> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (settings: Settings) => window.api.setSettings(settings),
    onSuccess: (_, settings) => {
      applyTheme(settings.theme)
      queryClient.setQueryData(['settings'], settings)
      queryClient.invalidateQueries({ queryKey: ['movies'] })
      queryClient.invalidateQueries({ queryKey: ['tv-shows'] })
      queryClient.invalidateQueries({ queryKey: ['recently-added'] })
    }
  })
}

export const usePosterUpdates = (): void => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const unsubscribe = window.api.onPosterUpdated((data: PosterUpdate): void => {
      console.log('Poster updated:', data)

      const posterUrl = `poster://${encodeURIComponent(data.title)}.jpg?t=${Date.now()}`

      queryClient.setQueryData<Movie[]>(['movies'], (old) =>
        old?.map((m) => (data.title === m.title ? { ...m, posterUrl } : m))
      )

      queryClient.setQueryData<TvShow[]>(['tv-shows'], (old) =>
        old?.map((s) => (data.title === s.title ? { ...s, posterUrl } : s))
      )

      queryClient.setQueryData<(Movie | TvShow)[]>(['recently-added'], (old) =>
        old?.map((s) => (data.title === s.title ? { ...s, posterUrl } : s))
      )
    })

    return unsubscribe
  }, [queryClient])
}
