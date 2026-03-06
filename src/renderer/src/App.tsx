import { Content } from './components/Content'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

function App(): React.JSX.Element {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Content />
      </div>
      <Footer />
    </div>
  )
}

export default App
