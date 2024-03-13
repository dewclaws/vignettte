import { BoltIcon, ClapperboardIcon, HomeIcon } from "lucide-react"
import Link from "next/link"
import { NavLink } from "./link"

export default function NavPane() {
  return (
    <aside className="hidden lg:block sticky top-0 h-screen overflow-y-auto border-e dark:border-gray-600 bg-gray-100/40 dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <header className="flex items-center px-6 py-4 border-b dark:border-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <ClapperboardIcon className="w-6 h-6" />
            <span className="italic tracking-tight">vignettte</span>
          </Link>
        </header>
        <section className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-3 text-sm">
            <NavLink
              href="/"
              icon={<HomeIcon />}
            >
              Overview
            </NavLink>
          </nav>
        </section>
        <footer className="grid itemc-center border-t dark:border-gray-600">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg text-gray-500 px-3 py-2 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
          >
            <BoltIcon className="w-6 h-6" />
            <span className="text-sm">Preferences</span>
          </Link>
        </footer>
      </div>
    </aside>
  )
}
