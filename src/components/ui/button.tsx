import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-[hsl(221,83%,53%)] text-[hsl(210,40%,98%)] hover:bg-[hsl(221,83%,45%)]",
        secondary: "bg-[hsl(210,40%,96.1%)] text-[hsl(222.2,47.4%,11.2%)] hover:bg-[hsl(210,40%,90%)]",
        outline: "border border-[hsl(214.3,31.8%,91.4%)] bg-transparent text-[hsl(221,83%,53%)] hover:bg-[hsl(210,40%,96.1%)]",
        ghost: "bg-transparent hover:bg-[hsl(210,40%,96.1%)] text-[hsl(221,83%,53%)]",
        link: "bg-transparent underline-offset-4 hover:underline text-[hsl(221,83%,53%)]",
      },
      size: {
        sm: "h-9 px-3",
        default: "h-10 px-4",
        lg: "h-11 px-8",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="loader mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
