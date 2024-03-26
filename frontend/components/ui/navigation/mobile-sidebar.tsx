"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "../button";
import { Sheet, SheetContent, SheetTrigger } from "../sheet";
import Sidebar from "./sidebar";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <MenuIcon />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 pe-12">
        <Sidebar mobile />
      </SheetContent>
    </Sheet>
  );
}
