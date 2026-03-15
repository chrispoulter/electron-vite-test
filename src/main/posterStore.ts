import { app } from 'electron'
import { join } from 'path'
import { readFileSync } from 'fs'
import { writeFile } from 'fs/promises'

const postersPath = join(app.getPath('userData'), 'posters.json')

const posters: Record<string, string | null> = (() => {
  try {
    const data = readFileSync(postersPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Failed to load posters:', error)
    return {}
  }
})()

export const getPosterUrl = (key: string): string | null | undefined => posters[key]

export const setPosterUrl = async (key: string, posterUrl: string | null): Promise<void> => {
  posters[key] = posterUrl

  try {
    await writeFile(postersPath, JSON.stringify(posters, null, 2))
  } catch (error) {
    console.error('Failed to save posters:', error)
  }
}
