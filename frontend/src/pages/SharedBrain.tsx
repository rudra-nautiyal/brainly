// src/pages/SharedBrain.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Card } from "../components/Card";
import { BACKEND_URL } from "../config";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  note?: string;
}

export function SharedBrain() {
  // Matches the ":shareLink" param name used in the backend route
  const { shareLink } = useParams<{ shareLink: string }>();

  const [username, setUsername] = useState<string>("");
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!shareLink) return;

    const fetchSharedBrain = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        // Public endpoint — no Authorization header needed
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/brain/${shareLink}`,
        );

        setUsername(response.data.username);
        setContents(response.data.content || []);
      } catch (error) {
        console.error("Failed to fetch shared brain:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedBrain();
  }, [shareLink]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f5f6]">
        <p className="text-gray-400 font-bold">Loading shared brain...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f5f6]">
        <p className="text-gray-400 font-bold">
          This share link doesn't exist or has been disabled.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f5f6] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-[#101820] tracking-tight mb-8">
          {username ? `${username}'s Brain 🧠` : "Shared Brain 🧠"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {contents.map(({ _id, type, link, title, note }) => (
            <Card key={_id} type={type} link={link} title={title} note={note} />
          ))}

          {contents.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400 font-bold">
              This brain is empty.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
