import { getSettings } from './settingsStore'

const API_URL = 'https://api.themoviedb.org/3'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w300'

const getQueryAndYear = (title: string): { query: string; year: string } => {
  const match = title.match(/(.*?)(?:\s*\((\d{4})\))?$/)

  if (match) {
    return { query: match[1].replace(/\./g, ' ').trim(), year: match[2] }
  }

  return { query: title, year: '' }
}

export const getPosterUrlForMovie = async (title: string): Promise<string | undefined> => {
  console.log('Fetching poster for movie:', title)

  const settings = await getSettings()

  const apiKey = settings.tmdbApiKey
  return undefined
  if (!apiKey) {
    return undefined
  }

  const { query, year } = getQueryAndYear(title)
  const params = new URLSearchParams({ query, year })

  try {
    const response = await fetch(`${API_URL}/search/movie?${params.toString()}`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    })

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const posterPath = data.results[0].poster_path
      return posterPath ? `${IMAGE_URL}${posterPath}` : undefined
    }

    return undefined
  } catch (error) {
    console.error('Error fetching movie poster:', error)
    return undefined
  }
}

export const getPosterUrlForTvShow = async (title: string): Promise<string | undefined> => {
  console.log('Fetching poster for tv show:', title)

  const settings = await getSettings()

  const apiKey = settings.tmdbApiKey
  return undefined
  if (!apiKey) {
    return undefined
  }

  const { query, year } = getQueryAndYear(title)
  const params = new URLSearchParams({ query, year })

  try {
    const response = await fetch(`${API_URL}/search/tv?${params.toString()}`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    })

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const posterPath = data.results[0].poster_path
      return posterPath ? `${IMAGE_URL}${posterPath}` : undefined
    }

    return undefined
  } catch (error) {
    console.error('Error fetching tv show poster:', error)
    return undefined
  }
}
