"use client";

import {
  BoltIcon,
  BookOpenIcon,
  ClapperboardIcon,
  LibraryBigIcon,
} from "lucide-react";
import Link from "next/link";
import { NavLink } from "./link";

export default function NavPane() {
  return (
    <aside className="hidden lg:block sticky top-0 h-screen overflow-y-auto bg-card">
      <div className="flex h-full max-h-screen flex-col">
        <header className="flex items-center pe-3">
          <Link
            href="/"
            className="h-16 flex w-full items-center rounded-br-md px-5 py-3 gap-3 bg-primary border border-primary text-white dark:border-primary/25 dark:bg-primary/50"
          >
            <ClapperboardIcon className="w-8 h-8" />
            <span className="font-black tracking-wide">vignettte</span>
          </Link>
        </header>
        <nav className="flex-1 overflow-auto grid items-start p-3 ps-0">
          <NavLink href="/" highlight={/^\/$/} icon={<LibraryBigIcon />}>
            Library
          </NavLink>
        </nav>
        <footer className="grid items-center p-3 ps-0">
          <NavLink
            href="/settings"
            highlight={/^\/settings/}
            icon={<BoltIcon />}
          >
            Settings
          </NavLink>
          <NavLink href="/help" icon={<BookOpenIcon />}>
            Help
          </NavLink>
        </footer>
      </div>
    </aside>
  );
}
