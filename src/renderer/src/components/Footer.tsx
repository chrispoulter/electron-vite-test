import { useState } from 'react'

export const Footer = (): React.JSX.Element => {
  const [versions] = useState(window.electron.process.versions)

  return (
    <footer className="mt-auto bg-gray-800 p-4 text-white">
      <p className="text-center">&copy; 2026 Media Library. All rights reserved.</p>
      <p className="mt-2 text-center text-sm">
        Electron v{versions.electron} | Chromium v{versions.chrome} | Node v{versions.node}
      </p>
    </footer>
  )
}
