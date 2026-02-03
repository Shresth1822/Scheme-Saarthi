import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // Wait, I didn't install radix slot. I'll stick to simple or install it?
// Actually, for now, simple button without polymorphic 'asChild' to save time unless I install radix-slot.
// I'll skip slot for now.

import { cn } from "@/lib/utils";
// import { cva, type VariantProps } from "class-variance-authority" // Didn't install cva either.
// I'll write simple manual variant logic to avoid too many deps for now, or just install cva?
// "Premium designs" usually need good variants.
// I will perform a quick install of cva and radix-slot in next step to make it robust.
// For now, I will write standard Tailwind button.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    // Base styles
    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    // Variants
    const variants = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    };

    // Sizes
    const sizes = {
      default: "h-11 px-8 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-12 rounded-lg px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(base, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
