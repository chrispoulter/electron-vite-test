import { BrowserWindow } from 'electron'
import { Poster } from '../shared/types'
import { getPosterUrl, setPosterUrl } from './posterStore'
import { getPosterUrlForMovie, getPosterUrlForTvShow } from './tmdbFetcher'

type QueueItem = { title: string; type: 'movie' | 'tv-show' }

const queue: QueueItem[] = []
let isProcessing = false

export const enqueuePoster = (title: string, type: 'movie' | 'tv-show'): void => {
  console.log('Enqueuing poster image for', title, type)

  if (getPosterUrl(title)) {
    return
  }

  if (queue.some((item) => item.title === title)) {
    return
  }

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
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
  isProcessing = false
}

const processItem = async (item: QueueItem): Promise<void> => {
  console.log('Processing poster image for', item.title, item.type)

  let posterUrl: string | undefined

  switch (item.type) {
    case 'movie':
      posterUrl = await getPosterUrlForMovie(item.title)
      break

    case 'tv-show':
      posterUrl = await getPosterUrlForTvShow(item.title)
      break
  }

  await setPosterUrl(item.title, posterUrl)

  broadcastPosterUpdate({ title: item.title, type: item.type, posterUrl })
}

const broadcastPosterUpdate = (poster: Poster): void =>
  BrowserWindow.getAllWindows().forEach((win) => win.webContents.send('poster-updated', poster))
