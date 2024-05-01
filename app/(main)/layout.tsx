import { NavBar } from "@/components/nav";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavBar position="top" />
      <main className="flex flex-1 justify-center w-full overflow-y-scroll">
        <div className="max-w-screen-lg w-full h-full">
          {children}
          <div className="bg-content-background absolute max-w-screen-lg w-full inset-y-0 -z-10"></div>
        </div>
      </main>
      <NavBar position="bottom" />
    </>
  );
}
