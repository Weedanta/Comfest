import React, { forwardRef } from "react";
import { ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "rounded-2xl flex justify-center items-center shrink-0 h-16 font-medium text-2xl transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-neutral-600 text-white [text-shadow:_0px_0px_30px_rgba(255,255,255,0.6)] hover:bg-primary-700",
        secondary:
          "bg-neutral-0 text-primary-700 [text-shadow:_0px_0px_30px_rgba(255,255,255,0.6)] hover:bg-neutral-100",
        disabled: "bg-neutral-400 text-neutral-200 cursor-not-allowed",
        tertiary:
          "bg-tertiary-50 text-tertiary-700 [text-shadow:_0px_0px_30px_rgba(255,255,255,0.6)] hover:bg-tertiary-100",
      },
      size: {
        small: "w-36",
        normal: "w-60",
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
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, disabled, ...props }, ref) => {
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
      />
    );
  }
);

Button.displayName = "Button";
export { Button, buttonVariants };
