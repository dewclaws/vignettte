import { ShellHeaderNavigation } from "@/components/shell/header";
import {
  GlassesIcon,
  RssIcon,
  SlidersHorizontalIcon,
  UnplugIcon,
} from "lucide-react";
import React from "react";

const menuItems: {
  title: string;
  href: string;
  icon?: React.ReactElement;
  description: string;
}[] = [
  {
    title: "General",
    icon: <SlidersHorizontalIcon />,
    href: "",
    description: "Configure general settings for vignettte.",
  },
  {
    title: "Organizer",
    icon: <GlassesIcon />,
    href: "/organizer",
    description: "Configure the organizer, which renames and sorts your media.",
  },
  {
    title: "Monitors",
    icon: <RssIcon />,
    href: "/monitors",
    description: "Configure quality gates and matching for indexer monitors.",
  },
  {
    title: "External Services",
    icon: <UnplugIcon />,
    href: "/external",
    description:
      "Configure external services like indexers and download clients.",
  },
];

export default function PreferencesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ShellHeaderNavigation menuItems={menuItems} />
      <div className="p-6">{children}</div>
    </>
  );
}
