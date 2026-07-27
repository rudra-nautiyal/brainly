import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ text, icon, active, onClick }: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold cursor-pointer transition-all duration-200 border-2 ${
        active
          ? "bg-[#FEE715] text-[#101820] border-[#101820] shadow-[3px_3px_0px_0px_rgba(16,24,32,1)] -translate-y-0.5"
          : "bg-white text-gray-700 border-transparent hover:border-[#101820] hover:bg-gray-50 hover:shadow-[3px_3px_0px_0px_rgba(16,24,32,1)]"
      }`}
    >
      {/* Icon Wrapper */}
      <div className="shrink-0">{icon}</div>

      {/* Text Label */}
      <div className="tracking-tight">{text}</div>
    </div>
  );
}
