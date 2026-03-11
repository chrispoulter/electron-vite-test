import { app } from 'electron'
import { join } from 'path'
import { readFile, writeFile } from 'fs/promises'

const postersPath = join(app.getPath('userData'), 'posters.json')
let posters: Record<string, string | undefined> = {}

export const getPosters = async (): Promise<Record<string, string | undefined>> => {
  try {
    const data = await readFile(postersPath, 'utf-8')
    posters = JSON.parse(data)
  } catch {
    posters = {}
  }

  return posters
}

export const getPosterUrl = (title: string): string | undefined => posters[title]

export const setPosterUrl = async (title: string, posterUrl?: string): Promise<void> => {
  posters[title] = posterUrl
  await writeFile(postersPath, JSON.stringify(posters, null, 2))
}
