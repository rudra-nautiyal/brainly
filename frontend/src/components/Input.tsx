// src/components/Input.tsx
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onChange,
      placeholder,
      type = "text",
      startIcon,
      endIcon,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative w-full">
        {/* Starting Icon */}
        {startIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
            {startIcon}
          </div>
        )}

        {/* Input Element with forwardRef */}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full text-sm border border-neutral-200 rounded-xl px-4 py-3 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 outline-none transition duration-150 ease-in-out
          placeholder:text-neutral-400
          ${startIcon ? "pl-11" : ""}
          ${endIcon ? "pr-11" : ""}
          ${className}
        `}
          {...props}
        />

        {/* Ending Icon */}
        {endIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer">
            {endIcon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
