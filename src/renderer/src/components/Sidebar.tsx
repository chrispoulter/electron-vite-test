import clsx from 'clsx'

type SidebarProps = {
  view: string
  setView: (view: string) => void
}

export const Sidebar = ({ view, setView }: SidebarProps): React.JSX.Element => {
  return (
    <aside className="w-64 bg-gray-200 dark:bg-gray-800 p-4">
      <nav>
        <ul>
          <li className="mb-2">
            <a
              href="#"
              className={clsx('block px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700', {
                'bg-gray-300 dark:bg-gray-700': view === 'recently-added'
              })}
              onClick={() => setView('recently-added')}
            >
              Recently Added
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className={clsx('block px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700', {
                'bg-gray-300 dark:bg-gray-700': view === 'movies'
              })}
              onClick={() => setView('movies')}
            >
              Movies
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className={clsx('block px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700', {
                'bg-gray-300 dark:bg-gray-700': view === 'tv-shows'
              })}
              onClick={() => setView('tv-shows')}
            >
              TV Shows
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className={clsx('block px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700', {
                'bg-gray-300 dark:bg-gray-700': view === 'settings'
              })}
              onClick={() => setView('settings')}
            >
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
