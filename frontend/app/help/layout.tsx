import {
  ShellHeaderNavigation,
  type MenuItem,
} from "@/components/shell/header";
import { BoltIcon, GlassesIcon } from "lucide-react";

const menuItems: MenuItem[] = [
  {
    title: "Preferences",
    icon: <BoltIcon />,
    href: "/preferences",
    description: "Details about configuration options.",
    children: [
      {
        title: "Organizer",
        icon: <GlassesIcon />,
        href: "/preferences/organizer",
        description: "Information about configuring the organizer.",
      },
    ],
  },
];

export default function HelpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ShellHeaderNavigation title="Help" menuItems={menuItems} />
      <div className="p-6">
        <nav className="flex flex-col" aria-label="Table of Contents">
          <ul></ul>
        </nav>
        <section>{children}</section>
      </div>
    </>
  );
}
