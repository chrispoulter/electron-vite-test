import { app } from 'electron'
import { join } from 'path'
import { readFile, writeFile } from 'fs/promises'

const postersPath = join(app.getPath('userData'), 'posters.json')
let posters: Record<string, string | null> = {}

export const getPosters = async (): Promise<Record<string, string | null>> => {
  try {
    const data = await readFile(postersPath, 'utf-8')
    posters = JSON.parse(data)
  } catch {
    posters = {}
  }

  return posters
}

export const getPosterUrl = (title: string): string | null => posters[title]

export const setPosterUrl = async (title: string, posterUrl: string | null): Promise<void> => {
  posters[title] = posterUrl
  await writeFile(postersPath, JSON.stringify(posters, null, 2))
}
