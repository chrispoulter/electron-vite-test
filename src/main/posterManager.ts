import log from 'electron-log/main'
import { BrowserWindow } from 'electron'
import { Poster } from '../shared/types'
import { getPoster, setPoster } from './posterStore'
import { getPosterUrlForMovie, getPosterUrlForTvShow } from './tmdbFetcher'

type QueueItem = { title: string; type: 'movie' | 'tv-show' }

const queue: QueueItem[] = []
let isProcessing = false

export const enqueuePoster = (
  title: string,
  type: 'movie' | 'tv-show',
  tmdbApiKey: string
): void => {
  log.info('Enqueuing poster image for', title, type)

  const posterUrl = getPoster(title)

  if (posterUrl !== undefined) {
    return
  }

  if (queue.some((item) => item.title === title)) {
    return
  }

  queue.push({ title, type })

  if (!isProcessing) {
    processQueue(tmdbApiKey)
  }
}

const processQueue = async (tmdbApiKey: string): Promise<void> => {
  isProcessing = true
  while (queue.length > 0) {
    const item = queue.shift()

    if (item) {
      await processItem(item, tmdbApiKey)
    }

    if (queue.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
  isProcessing = false
}

const processItem = async (item: QueueItem, tmdbApiKey: string): Promise<void> => {
  log.info('Processing poster image for', item.title, item.type)

  let posterUrl: string | null

  switch (item.type) {
    case 'movie':
      posterUrl = await getPosterUrlForMovie(item.title, tmdbApiKey)
      break

    case 'tv-show':
      posterUrl = await getPosterUrlForTvShow(item.title, tmdbApiKey)
      break
  }

  setPoster(item.title, posterUrl)

  if (!posterUrl) {
    return
  }

  // try {
  //   const postersDir = join(app.getPath('userData'), 'posters')
  //   await mkdir(postersDir, { recursive: true })

  //   const filePath = join(postersDir, `${item.title}.jpg`)

  //   const response = await fetch(posterUrl)

  //   if (!response.ok) {
  //     console.error('Failed to fetch poster image for', item.title, 'Status:', response.status)
  //     return
  //   }

  //   const arrayBuffer = await response.arrayBuffer()
  //   const buffer = Buffer.from(arrayBuffer)
  //   await writeFile(filePath, buffer)

  //   // posterUrl = `poster://${item.title}.jpg`
  //   // await setPosterUrl(item.title, posterUrl)

  //   console.log('Saved poster image for', item.title)
  // } catch (error) {
  //   console.error('Error fetching/saving poster image for', item.title, error)
  // }

  broadcastPosterUpdate({ title: item.title, type: item.type, posterUrl })
}

const broadcastPosterUpdate = (poster: Poster): void =>
  BrowserWindow.getAllWindows().forEach((win) => win.webContents.send('poster-updated', poster))
