import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
}

const variantClasses = {
  primary:
    "bg-[#101820] hover:bg-[#1B2733] active:bg-black text-white border-b-4 border-[#000000]",

  secondary:
    "bg-[#FEE715] hover:bg-[#FFD60A] active:bg-[#E6CF00] text-[#101820] border-b-4 border-[#D4BE00]",
};

const defaultStyles =
  "inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-all duration-150 active:translate-y-[2px] cursor-pointer select-none";

export function Button(props: ButtonProps) {
  return (
    <button className={`${variantClasses[props.variant]} ${defaultStyles}`}>
      {props.startIcon}
      {props.text}
    </button>
  );
}
