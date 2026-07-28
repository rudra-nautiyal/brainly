// src/pages/DashBoard.tsx

import { useEffect, useMemo, useState } from "react";

import { Button } from "../components/Button";

import { Card } from "../components/Card";

import { PlusIcon } from "../icons/PlusIcon";

import { ShareIcon } from "../icons/ShareIcon";

import { CreateContentModal } from "../components/CreateContentModal";

import { Sidebar, type ContentFilter } from "../components/Sidebar";

import { http } from "../lib/http";

// Content shape returned by the backend
interface Content {
  _id: string;

  title: string;

  link: string;

  type: "twitter" | "youtube";

  note?: string;
}

export function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);

  const [contents, setContents] = useState<Content[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState<ContentFilter>("all");

  // 1. Function to Fetch Content from Backend

  const fetchContents = async () => {
    try {
      setIsLoading(true);

      const response = await http.get("/api/v1/content");

      setContents(response.data.content || []);
    } catch (error) {
      console.error("Failed to fetch contents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Fetch on initial load

  useEffect(() => {
    fetchContents();
  }, []);

  // 3. Share Brain Handler

  const handleShareBrain = async () => {
    try {
      const response = await http.post("/api/v1/brain/share", {
        share: true,
      });

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

  // 4. Delete Handler (optimistic — removes the card immediately, no full refetch)

  const handleDeleteContent = async (id: string) => {
    const previousContents = contents;
    setContents((prev) => prev.filter((c) => c._id !== id));

    try {
      await http.delete(`/api/v1/content/${id}`);
    } catch (error) {
      console.error("Failed to delete content:", error);
      alert("Couldn't delete that card. Please try again.");
      setContents(previousContents); // roll back on failure
    }
  };

  // 5. Note Update Handler (optimistic)

  const handleUpdateNote = async (id: string, note: string) => {
    const previousContents = contents;
    setContents((prev) => prev.map((c) => (c._id === id ? { ...c, note } : c)));

    try {
      await http.patch(`/api/v1/content/${id}`, { note });
    } catch (error) {
      console.error("Failed to update note:", error);
      alert("Couldn't save that note. Please try again.");
      setContents(previousContents); // roll back on failure
    }
  };

  const filteredContents = useMemo(() => {
    if (filter === "all") return contents;
    return contents.filter((c) => c.type === filter);
  }, [contents, filter]);

  return (
    <div className="flex min-h-screen bg-[#f4f5f6]">
      {/* Fixed Sidebar */}

      <Sidebar activeFilter={filter} onFilterChange={setFilter} />

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

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl border-2 border-gray-200 bg-white animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Cards Grid System */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {/* Dynamically render cards based on backend data */}

            {filteredContents.map(({ _id, type, link, title, note }) => (
              <Card
                key={_id}
                id={_id}
                type={type}
                link={link}
                title={title}
                note={note}
                onDelete={handleDeleteContent}
                onUpdateNote={handleUpdateNote}
              />
            ))}

            {/* Fallback state if brain is empty */}

            {filteredContents.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-400 font-bold">
                {contents.length === 0
                  ? "Your brain is empty. Add some content!"
                  : "Nothing here yet for this filter."}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
