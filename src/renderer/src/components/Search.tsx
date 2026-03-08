type SearchProps = { value: string; onChange: (value: string) => void; placeholder?: string }

export const Search = ({ value, onChange, placeholder }: SearchProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4 w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
    />
  )
}
