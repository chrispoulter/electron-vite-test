export const Sidebar = (): React.JSX.Element => {
  return (
    <aside className="w-64 bg-gray-200 dark:bg-gray-800 p-4">
      <nav>
        <ul>
          <li className="mb-2">
            <a
              href="#"
              className="block px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Home
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="block px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Library
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="block px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
