import React, { forwardRef } from "react";
import { ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "rounded-2xl flex justify-center items-center shrink-0 h-14 font-medium text-2xl transition-all duration-300 ease-in-out cursor-pointer hover:shadow-lg active:scale-95 gap-3",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-600 text-white hover:bg-primary-700",
        secondary:
          "bg-neutral-0 text-primary-700  hover:bg-neutral-100",
        disabled: "bg-neutral-400 text-neutral-200 cursor-not-allowed",
        tertiary:
          "bg-tertiary-600 text-white hover:bg-tertiary-700",
      },
      size: {
        normal: "w-56",
        small: "w-36",
        large: "w-72",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "normal",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, disabled, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({
            variant: disabled ? "disabled" : variant,
            size,
            className,
          })
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {leftIcon && (
          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        
        <span className="flex-1 text-center">
          {children}
        </span>
        
        {rightIcon && (
          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button, buttonVariants };