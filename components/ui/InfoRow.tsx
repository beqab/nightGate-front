"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoRowProps {
  icon: ReactNode;
  label?: string;
  value: string;
  highlight?: boolean;
  className?: string;
}

export default function InfoRow({
  icon,
  label,
  value,
  highlight = false,
  className,
}: InfoRowProps) {
  return (
    <div className={cn("flex items-center gap-3 py-3", className)}>
      <div
        className={cn(
          "flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200",
          highlight
            ? "bg-[#ea6390]/15 text-[#ea6390]"
            : "bg-white/5 text-white/40"
        )}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        {label && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25 leading-none mb-1">
            {label}
          </p>
        )}
        <p
          className={cn(
            "text-sm font-medium leading-snug truncate",
            highlight ? "text-[#ea6390]" : "text-white/75"
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
