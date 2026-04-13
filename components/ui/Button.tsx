"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  glow?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#ea6390] to-[#9e4280] text-white font-semibold hover:from-[#c84d77] hover:to-[#7d3568] shadow-[0_4px_24px_rgba(234,99,144,0.4)] hover:shadow-[0_4px_40px_rgba(234,99,144,0.6)] transition-[background,box-shadow,color,border-color] duration-200",
  secondary:
    "bg-gradient-to-r from-[#9e4280] to-[#6e2e80] text-white font-semibold hover:from-[#7d3568] hover:to-[#5a2568] shadow-[0_4px_24px_rgba(158,66,128,0.4)] hover:shadow-[0_4px_40px_rgba(158,66,128,0.6)] transition-[background,box-shadow,color,border-color] duration-200",
  ghost:
    "bg-transparent text-white/80 hover:text-white border border-white/10 hover:border-white/30 hover:bg-white/5 transition-[background,box-shadow,color,border-color] duration-100",
  outline:
    "bg-transparent text-[#ea6390] border border-[#ea6390]/40 hover:border-[#ea6390] hover:bg-[#ea6390]/10 hover:shadow-[0_0_20px_rgba(234,99,144,0.3)] transition-[background,box-shadow,color,border-color] duration-200",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
  xl: "px-10 py-5 text-lg rounded-2xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      glow = false,
      loading = false,
      icon,
      iconPosition = "left",
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 cursor-pointer select-none",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          glow && "glow-neon",
          className
        )}
        disabled={disabled || loading}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="flex-shrink-0">{icon}</span>
            )}
            {children}
            {icon && iconPosition === "right" && (
              <span className="flex-shrink-0">{icon}</span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
