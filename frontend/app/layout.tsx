import Sidebar from "@/components/ui/navigation/sidebar";
import { Toaster } from "@/components/ui/toast";
import { cc } from "@/lib/utilities";
import type { Metadata } from "next";
import { Fira_Code, Fira_Sans } from "next/font/google";
import "./globals.css";

const body = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-body",
});

const mono = Fira_Code({
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
          "text-foreground bg-background",
        )}
      >
        <div className="max-h-screen w-full overflow-hidden lg:grid lg:grid-cols-[250px_1fr] gap-4">
          <Sidebar />
          <main className="flex flex-col">{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
