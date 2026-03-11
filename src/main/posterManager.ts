import { app, BrowserWindow } from 'electron'
import { mkdir, stat, writeFile } from 'fs/promises'
import { join } from 'path'
import { getPosterUrlForMovie, getPosterUrlForTvShow } from './tmdbFetcher'
import { PosterUpdate } from '../shared/types'

type QueueItem = { title: string; type: 'movie' | 'tv' }

const queue: QueueItem[] = []
let isProcessing = false

export const enqueuePoster = (title: string, type: 'movie' | 'tv'): void => {
  console.log('Enqueuing poster image for', title, type)
  queue.push({ title, type })

  if (!isProcessing) {
    processQueue()
  }
}

const processQueue = async (): Promise<void> => {
  isProcessing = true
  while (queue.length > 0) {
    const item = queue.shift()

    if (item) {
      await processItem(item)
    }

    if (queue.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
  }
  isProcessing = false
}

const processItem = async (item: QueueItem): Promise<void> => {
  console.log('Processing poster image for', item.title, item.type)

  const postersDir = join(app.getPath('userData'), 'posters')
  await mkdir(postersDir, { recursive: true })

  const filePath = join(postersDir, `${item.title}.jpg`)

  const exists = await stat(filePath).catch(() => false)
  if (exists) {
    console.log('Poster image already exists for', item.title)
    return
  }

  let posterUrl: string | undefined

  switch (item.type) {
    case 'movie':
      posterUrl = await getPosterUrlForMovie(item.title)
      break

    case 'tv':
      posterUrl = await getPosterUrlForTvShow(item.title)
      break
  }

  if (!posterUrl) {
    console.log('No poster URL found for', item.title)
    return
  }

  try {
    const response = await fetch(posterUrl)

    if (!response.ok) {
      console.error('Failed to fetch poster image for', item.title, 'Status:', response.status)
      return
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await writeFile(filePath, buffer)

    broadcastPosterUpdate({ title: item.title, type: item.type })

    console.log('Saved poster image for', item.title)
  } catch (error) {
    console.error('Error fetching/saving poster image for', item.title, error)
  }
}

const broadcastPosterUpdate = (data: PosterUpdate): void =>
  BrowserWindow.getAllWindows().forEach((win) => win.webContents.send('poster-updated', data))
