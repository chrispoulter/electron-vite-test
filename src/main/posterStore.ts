import { app } from 'electron'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const postersPath = join(app.getPath('userData'), 'posters.json')

let posters: Record<string, string | null> = {}

export const loadPosters = async (): Promise<Record<string, string | null>> => {
  try {
    const data = await readFile(postersPath, 'utf-8')
    posters = JSON.parse(data)
    return posters
  } catch (error) {
    console.error('Failed to load posters:', error)
    return {}
  }
}

export const getPosterUrl = (key: string): string | null | undefined => posters[key]

export const setPosterUrl = async (key: string, posterUrl: string | null): Promise<void> => {
  posters[key] = posterUrl

  try {
    await writeFile(postersPath, JSON.stringify(posters, null, 2))
  } catch (error) {
    console.error('Failed to save posters:', error)
  }
}
