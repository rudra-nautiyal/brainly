// src/components/CreateContentModal.tsx
import { useRef, useState, forwardRef } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";

// --- Icons ---
const YoutubeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const TwitterIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

// --- Main Component ---
export function CreateContentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [type, setType] = useState<"youtube" | "twitter">("youtube");
  const [isLoading, setIsLoading] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      alert("Please enter both a title and a link");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { link, type, title },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      onClose();
    } catch (error) {
      console.error("Error adding content", error);
      alert("Failed to add content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101820]/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl border-4 border-[#101820] p-6 shadow-[8px_8px_0px_0px_rgba(16,24,32,1)] flex flex-col gap-5">
        <div className="flex justify-between items-center border-b-2 border-gray-100 pb-3">
          <h2 className="text-xl font-black text-[#101820] tracking-tight">
            Add New Link
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#FEE715] hover:border-[#101820] border-2 border-transparent transition-all cursor-pointer text-gray-500 hover:text-[#101820]"
          >
            <CrossIcon />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#101820] ml-1">
              Content Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setType("youtube")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-bold transition-all ${
                  type === "youtube"
                    ? "bg-[#FEE715] border-[#101820] shadow-[4px_4px_0px_0px_rgba(16,24,32,1)] text-[#101820] -translate-y-0.5"
                    : "bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-600 hover:border-gray-300"
                }`}
              >
                <YoutubeIcon /> YouTube
              </button>

              <button
                type="button"
                onClick={() => setType("twitter")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-bold transition-all ${
                  type === "twitter"
                    ? "bg-[#FEE715] border-[#101820] shadow-[4px_4px_0px_0px_rgba(16,24,32,1)] text-[#101820] -translate-y-0.5"
                    : "bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-600 hover:border-gray-300"
                }`}
              >
                <TwitterIcon /> Twitter
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#101820] ml-1">
                Title
              </label>
              <Input
                ref={titleRef}
                placeholder="Enter title (e.g., React Guide)"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#101820] ml-1">
                URL
              </label>
              <Input
                ref={linkRef}
                placeholder={
                  type === "youtube"
                    ? "Enter YouTube video URL"
                    : "Enter Tweet URL"
                }
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={addContent}
            loading={isLoading}
            variant="primary"
            text="Save Content"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}

const Input = forwardRef<
  HTMLInputElement,
  {
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
>(({ placeholder, onChange }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <input
        ref={ref}
        placeholder={placeholder}
        type="text"
        className="w-full px-4 py-3 bg-gray-50 border-2 border-[#101820] rounded-xl font-bold text-[#101820] outline-none transition-all focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(16,24,32,1)] focus:-translate-y-0.5 placeholder:text-gray-400 placeholder:font-semibold"
        onChange={onChange}
      />
    </div>
  );
});
