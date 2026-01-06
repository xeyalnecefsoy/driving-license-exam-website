import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "icon";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-white hover:bg-blue-700 dark:hover:bg-blue-600 shadow-sm",
      secondary: "bg-muted text-foreground hover:bg-gray-200 dark:hover:bg-gray-700",
      outline: "border-2 border-border bg-transparent hover:bg-muted text-foreground",
      ghost: "hover:bg-muted text-secondary hover:text-foreground",
      danger: "bg-danger text-white hover:bg-red-600 dark:hover:bg-red-700",
      success: "bg-success text-white hover:bg-green-600 dark:hover:bg-green-700",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-12 px-6 text-base",
      lg: "h-14 px-8 text-lg",
      icon: "h-10 w-10 p-0 flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
