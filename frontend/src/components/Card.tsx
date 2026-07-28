// src/components/Card.tsx
import { useEffect, useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { CrossIcon } from "../icons/CrossIcon";

interface CardProps {
  id?: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  note?: string;
  onDelete?: (id: string) => void;
  onUpdateNote?: (id: string, note: string) => void;
}

export function Card({
  id,
  title,
  link,
  type,
  note,
  onDelete,
  onUpdateNote,
}: CardProps) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteDraft, setNoteDraft] = useState(note ?? "");

  // Convert YouTube standard link to embed link
  const embedLink =
    type === "youtube" ? link.replace("watch?v=", "embed/") : link;

  useEffect(() => {
    // Re-trigger Twitter's widget script to load the tweet when a new card is added
    if (type === "twitter" && (window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [type, link]);

  // Keep the draft in sync if the underlying note changes elsewhere.
  useEffect(() => {
    setNoteDraft(note ?? "");
  }, [note]);

  // Auto-revert the "are you sure?" delete state after a few seconds.
  useEffect(() => {
    if (!confirmingDelete) return;
    const timeout = setTimeout(() => setConfirmingDelete(false), 4000);
    return () => clearTimeout(timeout);
  }, [confirmingDelete]);

  function handleDeleteClick() {
    if (!id || !onDelete) return;
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }
    onDelete(id);
  }

  function handleSaveNote() {
    if (!id || !onUpdateNote) return;
    onUpdateNote(id, noteDraft.trim());
    setIsEditingNote(false);
  }

  function handleCancelNote() {
    setNoteDraft(note ?? "");
    setIsEditingNote(false);
  }

  return (
    <div className="w-full flex flex-col gap-4 rounded-2xl border-2 border-[#101820] bg-white p-5 shadow-[4px_4px_0px_0px_rgba(16,24,32,1)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(16,24,32,1)]">
      {/* Card Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 overflow-hidden">
          <h2 className="text-xl font-black text-[#101820] truncate tracking-tight">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {/* Open original link */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xl border-2 border-transparent text-gray-400 hover:text-[#101820] hover:border-[#101820] hover:bg-[#FEE715] hover:shadow-[2px_2px_0px_0px_rgba(16,24,32,1)] transition-all"
            aria-label="Open link"
          >
            <ShareIcon />
          </a>

          {/* Delete Button */}
          {id && onDelete && (
            <button
              type="button"
              onClick={handleDeleteClick}
              className={`p-1.5 rounded-xl border-2 font-bold transition-all flex items-center gap-1 ${
                confirmingDelete
                  ? "bg-red-500 border-red-600 text-white shadow-[2px_2px_0px_0px_rgba(16,24,32,1)]"
                  : "border-transparent text-gray-400 hover:text-red-600 hover:border-red-500 hover:bg-red-50"
              }`}
              aria-label={confirmingDelete ? "Confirm delete" : "Delete card"}
            >
              <TrashIcon />
              {confirmingDelete && (
                <span className="text-xs pr-0.5">Confirm?</span>
              )}
            </button>
          )}
        </div>
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

      {/* Note Area */}
      {isEditingNote ? (
        <div className="flex flex-col gap-2">
          <textarea
            autoFocus
            value={noteDraft}
            onChange={(e) => setNoteDraft(e.target.value)}
            placeholder="Jot down a quick note about this..."
            rows={3}
            maxLength={2000}
            className="w-full resize-none px-3 py-2 bg-gray-50 border-2 border-[#101820] rounded-xl text-sm font-semibold text-[#101820] outline-none focus:bg-white transition-all placeholder:text-gray-400 placeholder:font-normal"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancelNote}
              className="p-1.5 rounded-lg border-2 border-transparent text-gray-400 hover:text-[#101820] hover:border-[#101820] transition-all"
              aria-label="Cancel"
            >
              <CrossIcon />
            </button>
            <button
              type="button"
              onClick={handleSaveNote}
              className="px-3 py-1.5 rounded-lg border-2 border-[#101820] bg-[#FEE715] text-[#101820] text-xs font-bold hover:bg-[#FFD60A] transition-all"
            >
              Save Note
            </button>
          </div>
        </div>
      ) : note ? (
        <button
          type="button"
          onClick={() => onUpdateNote && setIsEditingNote(true)}
          className={`text-left bg-[#f4f5f6] border-2 border-[#101820] rounded-xl p-3 text-sm font-semibold text-[#101820] wrap-break-word group relative ${
            onUpdateNote ? "cursor-pointer" : "cursor-default"
          }`}
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between gap-2">
            Note
            {onUpdateNote && (
              <span className="normal-case font-semibold text-gray-400 group-hover:text-[#101820] flex items-center gap-1">
                <PencilIcon /> Edit
              </span>
            )}
          </p>
          {note}
        </button>
      ) : (
        onUpdateNote && (
          <button
            type="button"
            onClick={() => setIsEditingNote(true)}
            className="text-left text-sm font-bold text-gray-400 hover:text-[#101820] border-2 border-dashed border-gray-300 hover:border-[#101820] rounded-xl p-3 transition-all flex items-center gap-2"
          >
            <PencilIcon /> Add a note
          </button>
        )
      )}
    </div>
  );
}
