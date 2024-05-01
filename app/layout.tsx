import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.scss";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "vignettte",
  description: "A smarter media automator for bittorrent and usenet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable}`}>
        <ThemeProvider>
          <div
            className="isolate h-screen flex flex-col items-center overflow-hidden bg-body-background -z-20"
            vaul-drawer-wrapper=""
          >
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
