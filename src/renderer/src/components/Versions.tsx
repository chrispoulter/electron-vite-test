import { useState } from 'react'

function Versions(): React.JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <div>
      <h2 className="mt-6 text-2xl font-bold">Versions</h2>
      <ul className="list-disc pl-5">
        <li>Electron v{versions.electron}</li>
        <li>Chromium v{versions.chrome}</li>
        <li>Node v{versions.node}</li>
      </ul>
    </div>
  )
}

export default Versions
