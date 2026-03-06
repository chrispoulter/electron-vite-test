import { useState } from 'react'

export const Footer = (): React.JSX.Element => {
  const [versions] = useState(window.electron.process.versions)

  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <p className="text-center">&copy; 2024 Media Library. All rights reserved.</p>
      <p className="text-center text-sm mt-2">
        Electron v{versions.electron} | Chromium v{versions.chrome} | Node v{versions.node}
      </p>
    </footer>
  )
}
