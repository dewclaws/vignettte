import React from "react";

import { cc } from "@/lib/util";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cc(
          "flex h-input w-full rounded-md border border-input-border bg-input-background px-3 py-2 text-sm ring-offset-primary-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
