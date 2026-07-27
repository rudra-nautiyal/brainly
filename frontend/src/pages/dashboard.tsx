import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";

export function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);

  // Load Twitter Widgets Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.x.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f4f5f6]">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area (Offset by Sidebar Width) */}
      <main className="flex-1 ml-72 p-8">
        {/* Hidden Modal */}
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        {/* Dashboard Header & Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-4xl font-black text-[#101820] tracking-tight">
            Your Brain 🧠
          </h1>

          <div className="flex items-center gap-4">
            <Button
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
          <Card
            type="twitter"
            link="https://x.com/ESPNIndia/status/2075510876896207124"
            title="First tweet"
          />

          <Card
            type="youtube"
            link="https://www.youtube.com/watch?v=GRk01RER534"
            title="First video"
          />
        </div>
      </main>
    </div>
  );
}
