export const Footer = (): React.JSX.Element => {
  return (
    <footer className="mt-auto bg-gray-800 p-4 text-center text-white">
      &copy; {new Date().getFullYear()} Media Library. All rights reserved.
    </footer>
  )
}
