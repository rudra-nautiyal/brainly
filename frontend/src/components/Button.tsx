import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  text: string;
  startIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses = {
  primary:
    "bg-[#101820] hover:bg-[#1B2733] active:bg-black text-white border-[#000000]",
  secondary:
    "bg-[#FEE715] hover:bg-[#FFD60A] active:bg-[#E6CF00] text-[#101820] border-[#D4BE00]",
};

const defaultStyles =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-all duration-150 border-b-4 active:border-b-0 active:translate-y-[4px] cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:active:border-b-4 disabled:active:translate-y-0";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      text,
      startIcon,
      fullWidth,
      loading,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={`${defaultStyles} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg
            className="w-5 h-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          startIcon
        )}
        {text}
      </button>
    );
  },
);

Button.displayName = "Button";
