// src/components/Card.tsx
import { ShareIcon } from "../icons/ShareIcon";
import { useEffect } from "react";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  note?: string; // <-- Added optional note property
}

export function Card({ title, link, type, note }: CardProps) {
  // Convert YouTube standard link to embed link
  const embedLink =
    type === "youtube" ? link.replace("watch?v=", "embed/") : link;

  useEffect(() => {
    // Re-trigger Twitter's widget script to load the tweet when a new card is added
    if (type === "twitter" && (window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [type, link]);

  return (
    <div className="w-full flex flex-col gap-4 rounded-2xl border-2 border-[#101820] bg-white p-5 shadow-[4px_4px_0px_0px_rgba(16,24,32,1)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(16,24,32,1)]">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 overflow-hidden">
          <h2 className="text-xl font-black text-[#101820] truncate tracking-tight">
            {title}
          </h2>
        </div>

        {/* Share Button */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-xl border-2 border-transparent text-gray-400 hover:text-[#101820] hover:border-[#101820] hover:bg-[#FEE715] hover:shadow-[2px_2px_0px_0px_rgba(16,24,32,1)] transition-all"
        >
          <ShareIcon />
        </a>
      </div>

      {/* Embedded Content Area */}
      <div className="w-full rounded-xl overflow-hidden border-2 border-gray-100 bg-gray-50">
        {type === "youtube" && (
          <iframe
            className="aspect-video w-full"
            src={embedLink}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        {type === "twitter" && (
          <div className="p-2 w-full flex justify-center items-center">
            <blockquote className="twitter-tweet" data-theme="light">
              <a href={link}></a>
            </blockquote>
          </div>
        )}
      </div>

      {/* Note Display Area (Only shows if a note exists) */}
      {note && (
        <div className="bg-[#f4f5f6] border-2 border-[#101820] rounded-xl p-3 text-sm font-semibold text-[#101820] wrap-break-word">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            Note
          </p>
          {note}
        </div>
      )}
    </div>
  );
}
