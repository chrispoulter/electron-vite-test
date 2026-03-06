import { Movie } from './MoviesList'

export const MovieCard = ({ movie }: { movie: Movie }): React.JSX.Element => {
  return (
    <div
      className="bg-gray-200 dark:bg-gray-800 p-4 rounded"
      onClick={() => window.api.openFile(movie.filePath)}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-auto mb-2 rounded cursor-pointer"
      />
      <h3 className="text-lg font-bold">{movie.title}</h3>
    </div>
  )
}
