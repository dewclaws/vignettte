import { MobileSidebar } from "./mobile-sidebar";

export function NavigationBar({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <header className="sticky top-0 z-50 w-full font-semibold bg-background border-border border-b lg:border-s lg:rounded-bl-md">
      <div className="flex h-14 max-w-screen-2xl items-center">
        <MobileSidebar />
        <div className="md:px-6">{children}</div>
      </div>
    </header>
  );
}
