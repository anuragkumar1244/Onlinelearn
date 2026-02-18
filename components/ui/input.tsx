import * as React from "react";
import { cn } from "@/components/ui/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return <input className={cn("ui-input", className)} ref={ref} {...props} />;
  }
);
Input.displayName = "Input";
