// src/components/Input.tsx
// src/components/Input.tsx
import type { InputHTMLAttributes, ReactNode } from "react";

// Extend standard HTML input attributes
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  // onChange is already included in standard attributes,
  // but we type it more strictly here if needed
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  onChange,
  placeholder,
  type = "text",
  startIcon,
  endIcon,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">
      {/* Container for the starting icon (e.g., User or Lock) */}
      {startIcon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
          {startIcon}
        </div>
      )}

      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        // Base classes
        className={`w-full text-sm border border-neutral-200 rounded-xl px-4 py-3 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 outline-none transition duration-150 ease-in-out
          placeholder:text-neutral-400
          ${startIcon ? "pl-11" : ""} // Add padding if startIcon exists
          ${endIcon ? "pr-11" : ""}   // Add padding if endIcon exists
          ${className}
        `}
        {...props}
      />

      {/* Container for the ending icon (e.g., Password Visibility Toggle) */}
      {endIcon && (
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer">
          {endIcon}
        </div>
      )}
    </div>
  );
}
