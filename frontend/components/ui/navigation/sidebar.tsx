"use client";

import { cc } from "@/lib/utilities";
import {
  BoltIcon,
  BookOpenIcon,
  ClapperboardIcon,
  LibraryBigIcon,
} from "lucide-react";
import { NavLink } from "./nav-link";

export default function Sidebar({ mobile = false }: { mobile?: boolean }) {
  return (
    <aside
      className={cc(
        "h-screen overflow-y-auto bg-background",
        !mobile && "hidden lg:block sticky top-0",
      )}
    >
      <div className="flex flex-col max-h-screen h-full">
        <div className="inline-flex h-14 w-full items-center rounded-br-md px-6 py-3 gap-3 bg-primary border border-primary text-white dark:border-primary/25 dark:bg-primary/50 pointer-events-none select-none">
          <ClapperboardIcon />
          <span className="font-black tracking-wide">vignettte</span>
        </div>
        <nav className="flex flex-col justify-between h-full py-4">
          <div className="flex-1 overflow-auto grid items-start">
            <NavLink href="/" highlight={/^\/$/} icon={<LibraryBigIcon />}>
              Library
            </NavLink>
          </div>
          <div className="grid items-center">
            <NavLink
              href="/settings/general"
              highlight={/^\/settings/}
              icon={<BoltIcon />}
            >
              Settings
            </NavLink>
            <NavLink href="/help" icon={<BookOpenIcon />}>
              Help
            </NavLink>
          </div>
        </nav>
      </div>
    </aside>
  );
}
