const API_URL = 'https://api.themoviedb.org/3'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w300'

const parseQueryAndYear = (title: string): { query: string; year: string } => {
  const match = title.match(/(.*?)(?:\s*\((\d{4})\))?$/)

  if (match) {
    return { query: match[1].replace(/\./g, ' ').trim(), year: match[2] }
  }

  return { query: title, year: '' }
}

export const getPosterUrlForMovie = async (
  title: string,
  tmdbApiKey: string
): Promise<string | null> => {
  console.log('Fetching poster for movie:', title)

  if (!tmdbApiKey) {
    return null
  }

  const { query, year } = parseQueryAndYear(title)
  const params = new URLSearchParams({ query, year })

  try {
    const response = await fetch(`${API_URL}/search/movie?${params.toString()}`, {
      headers: { Authorization: `Bearer ${tmdbApiKey}` }
    })

    if (!response.ok) {
      throw new Error(`TMDb responded with ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const posterPath = data.results[0].poster_path
      return posterPath ? `${IMAGE_URL}${posterPath}` : null
    }

    return null
  } catch (error) {
    console.error('Error fetching movie poster:', error)
    return null
  }
}

export const getPosterUrlForTvShow = async (
  title: string,
  tmdbApiKey: string
): Promise<string | null> => {
  console.log('Fetching poster for tv show:', title)

  if (!tmdbApiKey) {
    return null
  }

  const { query, year } = parseQueryAndYear(title)
  const params = new URLSearchParams({ query, year })

  try {
    const response = await fetch(`${API_URL}/search/tv?${params.toString()}`, {
      headers: { Authorization: `Bearer ${tmdbApiKey}` }
    })

    if (!response.ok) {
      throw new Error(`TMDb responded with ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const posterPath = data.results[0].poster_path
      return posterPath ? `${IMAGE_URL}${posterPath}` : null
    }

    return null
  } catch (error) {
    console.error('Error fetching tv show poster:', error)
    return null
  }
}
