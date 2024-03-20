"use client";

import { BoltIcon, ClapperboardIcon, LibraryBigIcon } from "lucide-react";
import Link from "next/link";
import { NavLink } from "./link";

export default function NavPane() {
  return (
    <aside className="hidden lg:block sticky top-0 h-screen overflow-y-auto border-e border-border bg-card">
      <div className="flex h-full max-h-screen flex-col">
        <header className="flex items-center">
          <Link
            href="/"
            className="flex items-center w-full rounded-b-md px-5 py-3 gap-3 bg-primary text-white dark:border-transparent dark:text-primary dark:bg-transparent"
          >
            <ClapperboardIcon className="w-8 h-8" />
            <span className="font-black tracking-wide">vignettte</span>
          </Link>
        </header>
        <nav className="flex-1 overflow-auto grid items-start p-3">
          <NavLink href="/" highlight={/^\/$/} icon={<LibraryBigIcon />}>
            Library
          </NavLink>
        </nav>
        <footer className="grid itemc-center p-3">
          <NavLink href="/preferences" icon={<BoltIcon />}>
            Preferences
          </NavLink>
        </footer>
      </div>
    </aside>
  );
}
