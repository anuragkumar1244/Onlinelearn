import * as React from "react";
import { cn } from "@/components/ui/utils";

type BadgeVariant = "default" | "secondary" | "outline";

const variantClass: Record<BadgeVariant, string> = {
  default: "ui-badge ui-badge-default",
  secondary: "ui-badge ui-badge-secondary",
  outline: "ui-badge ui-badge-outline"
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return <span className={cn(variantClass[variant], className)} {...props} />;
}
