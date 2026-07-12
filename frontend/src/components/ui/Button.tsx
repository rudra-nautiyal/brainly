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
    "bg-[#42A5F5] hover:bg-[#2196F3] active:bg-[#1E88E5] text-white border-b-4 border-[#1976D2]",
};

const sizeStyles = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-8 text-base",
  lg: "h-14 px-10 text-lg",
};

const defaultStyles =
  "inline-flex items-center justify-center rounded-2xl font-extrabold transition-all duration-150 active:translate-y-[2px] cursor-pointer select-none";

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}
    >
      {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}
      {props.text}
      {props.endIcon}
    </button>
  );
};
