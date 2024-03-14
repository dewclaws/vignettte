import { BoltIcon, ClapperboardIcon, HomeIcon } from "lucide-react"
import Link from "next/link"
import { NavLink } from "./link"

export default function NavPane() {
  return (
    <aside className="hidden lg:block sticky top-0 h-screen overflow-y-auto border-e dark:border-neutral-600 bg-neutral-100/40 dark:bg-neutral-800/40">
      <div className="flex h-full max-h-screen flex-col">
        <header className="flex items-center">
          <Link href="/" className="flex items-center p-5 gap-2">
            <ClapperboardIcon className="w-8 h-8" />
            <span className="italic tracking-widest">vignettte</span>
          </Link>
        </header>
        <nav className="flex-1 overflow-auto grid items-start px-3 py-1">
          <NavLink href="/" highlight={/^\/$/} icon={<HomeIcon />}>
            Overview
          </NavLink>
        </nav>
        <footer className="grid itemc-center p-3">
          <NavLink href="/settings" icon={<BoltIcon />}>
            Preferences
          </NavLink>
        </footer>
      </div>
    </aside>
  )
}
