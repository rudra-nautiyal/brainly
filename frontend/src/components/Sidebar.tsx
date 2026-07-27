import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <aside className="h-screen bg-white border-r-4 border-[#101820] w-72 fixed left-0 top-0 flex flex-col p-6 z-40 select-none">
      {/* Sleek Brand Logo Header */}
      <div className="flex items-center gap-3.5 px-2 pt-2 pb-6 border-b-2 border-gray-100">
        <div className="w-12 h-12 bg-[#101820] text-white rounded-2xl border-2 border-[#101820] shadow-[3px_3px_0px_0px_rgba(16,24,32,0.2)] flex items-center justify-center transition-transform hover:-translate-y-0.5 cursor-pointer">
          <Logo />
        </div>
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-black text-[#101820] tracking-tight leading-none">
            Brainly
          </h1>
        </div>
      </div>

      {/* Navigation Group */}
      <nav className="flex flex-col gap-2 pt-6 flex-1">
        <SidebarItem text="Tweets" icon={<TwitterIcon />} />
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      </nav>
    </aside>
  );
}
