"use client";

import { Button } from "@/components/ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import React from "react";
import NewRequestContentSearch from "./ContentSearch";

export function NewRequestDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="h-5/6">
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-xl h-full">
            <DrawerHeader className="text-left">
              <DrawerTitle>New release monitor</DrawerTitle>
              <DrawerDescription>
                {"First, tell me what you're looking for."}
              </DrawerDescription>
            </DrawerHeader>
            <NewRequestContentSearch />
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" context="drawer">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
