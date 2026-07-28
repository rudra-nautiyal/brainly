// src/pages/DashBoard.tsx

import { useEffect, useState } from "react";

import { Button } from "../components/Button";

import { Card } from "../components/Card";

import { PlusIcon } from "../icons/PlusIcon";

import { ShareIcon } from "../icons/ShareIcon";

import { CreateContentModal } from "../components/CreateContentModal";

import { Sidebar } from "../components/Sidebar";

import axios from "axios";

import { BACKEND_URL } from "../config";

// Assuming your backend returns content in this shape

interface Content {
  _id: string;

  title: string;

  link: string;

  type: "twitter" | "youtube";
}

export function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);

  const [contents, setContents] = useState<Content[]>([]);

  // 1. Function to Fetch Content from Backend

  const fetchContents = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContents(response.data.content || []);
    } catch (error) {
      console.error("Failed to fetch contents:", error);
    }
  };

  // 2. Fetch on initial load

  useEffect(() => {
    fetchContents();
  }, []);

  // 3. Share Brain Handler

  const handleShareBrain = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Uses the current origin instead of hardcoding localhost,
      // so it works in dev, staging, and prod without edits.
      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;

      await navigator.clipboard.writeText(shareUrl);

      // Replace with a toast/snackbar if you have one available
      alert(`Share link copied to clipboard:\n${shareUrl}`);
    } catch (error) {
      console.error("Failed to share brain:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4f5f6]">
      {/* Fixed Sidebar */}

      <Sidebar />

      {/* Main Content Area (Offset by Sidebar Width) */}

      <main className="flex-1 ml-72 p-8">
        {/* Hidden Modal */}

        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);

            fetchContents(); // Refresh the list automatically after adding!
          }}
        />

        {/* Dashboard Header & Controls */}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-4xl font-black text-[#101820] tracking-tight">
            Your Brain 🧠
          </h1>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleShareBrain}
              variant="secondary"
              text="Share Brain"
              startIcon={<ShareIcon />}
            />

            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
            />
          </div>
        </div>

        {/* Cards Grid System */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {/* Dynamically render cards based on backend data */}

          {contents.map(({ _id, type, link, title }) => (
            <Card key={_id} type={type} link={link} title={title} />
          ))}

          {/* Fallback state if brain is empty */}

          {contents.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400 font-bold">
              Your brain is empty. Add some content!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
