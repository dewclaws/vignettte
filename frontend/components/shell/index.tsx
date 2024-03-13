import NavPane from "./nav/pane"

export default function Shell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <NavPane />
      <main className="flex flex-col">{children}</main>
    </div>
  )
}
