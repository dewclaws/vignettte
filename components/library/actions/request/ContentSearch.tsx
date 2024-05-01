"use client";

import { Input } from "@/components/ui/Input";

export default function NewRequestContentSearch() {
  return (
    <div className="h-full">
      <Input type="search" placeholder="Search ..." />
      <div className="flex items-center justify-center h-full"></div>
    </div>
  );
}
