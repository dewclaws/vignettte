import { cc } from "@/lib/util";
import { FilmSlate } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";

const branding = cva(
  "flex items-center gap-md font-mono tracking-tighter font-bold select-none",
  {
    variants: {
      context: {
        navbar: "h-full px-2xl bg-primary text-header-foreground text-xl",
        auth: "text-body-foreground text-3xl",
      },
    },
  }
);

const iconSize = (context: BrandingProps["context"]): string => {
  switch (context) {
    case "auth":
      return "size-12";
    default:
      return "size-3xl";
  }
};

interface BrandingProps extends VariantProps<typeof branding> {
  className?: string;
}

export default function NavBranding({ className, context }: BrandingProps) {
  return (
    <div className={cc(branding({ context }), className)}>
      <FilmSlate className={iconSize(context)} />
      <span className="hidden md:inline">vignettte</span>
    </div>
  );
}
