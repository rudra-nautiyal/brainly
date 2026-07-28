// src/components/ConfirmDialog.tsx
//
// A styled stand-in for window.confirm(), matching the app's neo-brutalist
// look instead of the browser's native (and very ugly) confirm popup.

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101820]/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onCancel} />

      <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl border-4 border-[#101820] p-6 shadow-[8px_8px_0px_0px_rgba(16,24,32,1)] flex flex-col gap-4">
        <h2 className="text-lg font-black text-[#101820] tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="text-sm font-semibold text-gray-500">
            {description}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border-2 border-transparent font-bold text-gray-500 hover:text-[#101820] hover:border-[#101820] transition-all"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl border-2 border-[#101820] font-bold transition-all shadow-[2px_2px_0px_0px_rgba(16,24,32,1)] hover:-translate-y-0.5 ${
              danger
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-[#FEE715] text-[#101820] hover:bg-[#FFD60A]"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
