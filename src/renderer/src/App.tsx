import Versions from './components/Versions'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button
        className="mt-4 flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={ipcHandle}
      >
        Send Ping
      </button>
      <Versions />
    </>
  )
}

export default App
