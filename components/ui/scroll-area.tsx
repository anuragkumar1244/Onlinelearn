import * as React from "react";
import { cn } from "@/components/ui/utils";

export function ScrollArea({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ui-scroll-area", className)} {...props} />;
}
