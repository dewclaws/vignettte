import NavPane from "@/components/nav/pane";
import { cc } from "@/lib/utilities";
import type { Metadata } from "next";
import { Fira_Sans, Martian_Mono } from "next/font/google";
import "./globals.css";

const body = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-body",
});

const mono = Martian_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "vignettte",
  description: "a smarter media manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cc(
          body.variable,
          mono.variable,
          "bg-white text-neutral-900 dark:bg-black dark:text-white",
        )}
      >
        <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[300px_1fr]">
          <NavPane />
          <main className="flex flex-col">{children}</main>
        </div>
      </body>
    </html>
  );
}
