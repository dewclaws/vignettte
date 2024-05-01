export default function OnboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-1 justify-center w-full overflow-y-scroll">
      <div className="w-full h-full">
        {children}
        <div className="bg-content-background absolute w-full inset-y-0 -z-10"></div>
      </div>
    </main>
  );
}
