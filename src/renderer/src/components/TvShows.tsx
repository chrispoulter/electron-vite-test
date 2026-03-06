export const TvShows = (): React.JSX.Element => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-bold mb-2">TV Show 1</h3>
        <p className="text-sm">Description of TV show 1.</p>
      </div>
      <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-bold mb-2">TV Show 2</h3>
        <p className="text-sm">Description of TV show 2.</p>
      </div>
      <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-bold mb-2">TV Show 3</h3>
        <p className="text-sm">Description of TV show 3.</p>
      </div>
    </div>
  )
}
