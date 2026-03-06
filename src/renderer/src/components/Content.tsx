import { Movies } from './Movies'
import { RecentlyAdded } from './RecentlyAdded'
import { Settings } from './Settings'
import { TvShows } from './TvShows'

type ContentProps = {
  view: string
}

export const Content = ({ view }: ContentProps): React.JSX.Element => {
  return (
    <main className="flex-1 p-4 overflow-auto">
      {view === 'recently-added' && <RecentlyAdded />}
      {view === 'movies' && <Movies />}
      {view === 'tv-shows' && <TvShows />}
      {view === 'settings' && <Settings />}
    </main>
  )
}
