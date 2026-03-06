import { RecentlyAdded } from './RecentlyAdded'
import { MoviesList } from './MoviesList'
import { TvShowsList } from './TvShowsList'
import { Settings } from './Settings'

type ContentProps = {
  view: string
}

export const Content = ({ view }: ContentProps): React.JSX.Element => {
  return (
    <main className="flex-1 p-4 overflow-auto">
      {view === 'recently-added' && <RecentlyAdded />}
      {view === 'movies' && <MoviesList />}
      {view === 'tv-shows' && <TvShowsList />}
      {view === 'settings' && <Settings />}
    </main>
  )
}
