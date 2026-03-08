import clsx from 'clsx'

type SidebarProps = {
  view: string
  setView: (view: string) => void
}

export const Sidebar = ({ view, setView }: SidebarProps): React.JSX.Element => {
  return (
    <aside className="w-64 bg-gray-200 p-4 dark:bg-gray-700 dark:text-white">
      <nav>
        <ul>
          <li className="mb-2">
            <a
              href="#"
              onClick={() => setView('recently-added')}
              className={clsx('block rounded px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600', {
                'bg-gray-300 dark:bg-gray-600': view === 'recently-added'
              })}
            >
              Recently Added
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={() => setView('movies')}
              className={clsx('block rounded px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600', {
                'bg-gray-300 dark:bg-gray-600': view === 'movies'
              })}
            >
              Movies
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={() => setView('tv-shows')}
              className={clsx('block rounded px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600', {
                'bg-gray-300 dark:bg-gray-600': view === 'tv-shows'
              })}
            >
              TV Shows
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={() => setView('settings')}
              className={clsx('block rounded px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600', {
                'bg-gray-300 dark:bg-gray-600': view === 'settings'
              })}
            >
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
