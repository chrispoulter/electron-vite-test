export const Content = (): React.JSX.Element => {
  return (
    <main className="flex-1 p-4 overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Welcome to the Media Library</h2>
      <p className="mb-4">Browse and manage your media collection with ease.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Media Item 1</h3>
          <p className="text-sm">Description of media item 1.</p>
        </div>
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Media Item 2</h3>
          <p className="text-sm">Description of media item 2.</p>
        </div>
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Media Item 3</h3>
          <p className="text-sm">Description of media item 3.</p>
        </div>
      </div>
    </main>
  )
}
