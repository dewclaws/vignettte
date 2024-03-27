import { MobileSidebar } from "./mobile-sidebar";

export function NavigationBar({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <header className="sticky top-0 z-50 w-full font-semibold bg-background border-border border-b lg:border-s lg:rounded-bl-md">
      <div className="flex h-14 max-w-screen-2xl items-center gap-2 px-4 lg:px-6">
        <MobileSidebar />
        <div className="text-xl font-bold">{children}</div>
      </div>
    </header>
  );
}
