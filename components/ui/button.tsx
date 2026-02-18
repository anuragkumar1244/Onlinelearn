import * as React from "react";
import { cn } from "@/components/ui/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "sm";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClass: Record<ButtonVariant, string> = {
  default: "ui-btn ui-btn-default",
  outline: "ui-btn ui-btn-outline",
  ghost: "ui-btn ui-btn-ghost"
};

const sizeClass: Record<ButtonSize, string> = {
  default: "ui-btn-md",
  sm: "ui-btn-sm"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(variantClass[variant], sizeClass[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
