import { useEffect, useState } from 'react'
import { Content } from './components/Content'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { applyTheme } from './utils/theme'

function App(): React.JSX.Element {
  const [view, setView] = useState('recently-added')

  useEffect(() => {
    window.api.getAppSettings().then((settings) => applyTheme(settings.theme))
  }, [])

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar view={view} setView={setView} />
        <Content view={view} />
      </div>
      <Footer />
    </div>
  )
}

export default App
