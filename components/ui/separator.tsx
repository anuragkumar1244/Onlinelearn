import * as React from "react";
import { cn } from "@/components/ui/utils";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <div
      className={cn(
        "ui-separator",
        orientation === "horizontal" ? "ui-separator-horizontal" : "ui-separator-vertical",
        className
      )}
      {...props}
    />
  );
}
