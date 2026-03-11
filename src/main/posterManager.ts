import { app } from 'electron'
import { mkdir, stat, writeFile } from 'fs/promises'
import { join } from 'path'
import { getPosterUrlForMovie, getPosterUrlForTvShow } from './tmdbFetcher'

type QueueItem = { title: string; type: 'movie' | 'tv' }

const queue: QueueItem[] = []
let isProcessing = false

export const enqueuePoster = (title: string, type: 'movie' | 'tv'): void => {
  console.log('Enqueuing poster for', title, type)
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
  console.log('Processing poster for', item.title, item.type)

  const filePath = join(app.getPath('userData'), 'posters', `${item.title}.jpg`)

  const exists = await stat(filePath)
    .then((s) => s.isFile())
    .catch(() => false)

  if (exists) {
    return
  }

  const posterUrl =
    item.type === 'movie'
      ? await getPosterUrlForMovie(item.title)
      : await getPosterUrlForTvShow(item.title)

  if (posterUrl) {
    try {
      const response = await fetch(posterUrl)
      if (response.ok) {
        const buffer = Buffer.from(await response.arrayBuffer())
        await stat(join(app.getPath('userData'), 'posters')).catch(() => {
          return mkdir(join(app.getPath('userData'), 'posters'))
        })
        await writeFile(filePath, buffer)
        console.log('Saved poster for', item.title)
      } else {
        console.error('Failed to fetch poster for', item.title, 'Status:', response.status)
      }
    } catch (error) {
      console.error('Error fetching/saving poster for', item.title, error)
    }
  } else {
    console.log('No poster found for', item.title)
  }
}
