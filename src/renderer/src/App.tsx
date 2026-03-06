import { useState } from 'react'
import { Content } from './components/Content'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

function App(): React.JSX.Element {
  const [view, setView] = useState('recently-added')

  return (
    <div className="flex flex-col h-screen">
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
