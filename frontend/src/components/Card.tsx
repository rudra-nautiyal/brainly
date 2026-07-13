import { ShareIcon } from "../icons/ShareIcon";
import { useEffect } from "react";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
  const embedLink =
    type === "youtube" ? link.replace("watch?v=", "embed/") : link;

  useEffect(() => {
    if (type === "twitter" && (window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [type, link]);

  return (
    <div className="w-full max-w-96 rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <h2 className="truncate font-semibold text-[#101820]">{title}</h2>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md p-1 text-[#6B7280] hover:text-[#101820] transition-colors"
        >
          <ShareIcon />
        </a>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg">
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
          <blockquote className="twitter-tweet">
            <a href={link}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
