import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
}

const variantStyles = {
  primary:
    "bg-[#58CC02] hover:bg-[#61E002] active:bg-[#46A302] text-white border-b-4 border-[#46A302]",

  secondary:
    "bg-[#F3F4F6] hover:bg-[#E5E7EB] active:bg-[#D1D5DB] text-[#374151] border-b-4 border-[#9CA3AF]",
};

const sizeStyles = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-8 text-base",
  lg: "h-14 px-10 text-lg",
};

const defaultStyles =
  "inline-flex items-center justify-center rounded-2xl font-extrabold transition-all duration-150 active:translate-y-[2px] shadow-sm hover:shadow-md cursor-pointer select-none";

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}
    >
      {props.startIcon && <span className="mr-2">{props.startIcon}</span>}

      <span>{props.text}</span>

      {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
    </button>
  );
};
