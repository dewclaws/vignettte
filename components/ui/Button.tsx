import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cc } from "@/lib/util";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium rounded-md bg-primary text-primary-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-header-foreground hover:bg-header-foreground hover:text-primary",
        outline:
          "border border-muted-background bg-body-background text-muted-foreground hover:text-body-background hover:bg-muted-background",
        ghost:
          "bg-transparent hover:bg-muted-background hover:text-body-background",
      },
      context: {
        default: "h-10 px-4 py-2",
        navbar:
          "size-navbar shrink-0 rounded-none focus-visible:ring-0 focus-visible:bg-header-foreground focus-visible:text-primary",
        drawer: "h-12 px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      context: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, context, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cc(buttonVariants({ variant, context, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
