import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";

export function CreateContentModal({ open, onClose }: any) {
  if (!open) return null; // Cleaner conditional rendering

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101820]/60 backdrop-blur-sm">
      {/* Invisible backdrop that closes the modal when clicked */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* The Modal Box */}
      <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl border-4 border-[#101820] p-6 shadow-[8px_8px_0px_0px_rgba(16,24,32,1)] flex flex-col gap-6">
        {/* Header & Close Button */}
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

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <Input placeholder="Enter title (e.g., React Guide)" />
          <Input placeholder="Enter link URL" />
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-center items-center">
          {/* Note: Assuming your Button accepts fullWidth. If not, wrap it in a div that stretches it! */}
          <Button variant="primary" text="Submit" />
        </div>
      </div>
    </div>
  );
}

// Upgraded Input Component
function Input({
  onChange,
  placeholder,
}: {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <input
        placeholder={placeholder}
        type="text"
        className="w-full px-4 py-3 bg-gray-50 border-2 border-[#101820] rounded-xl font-bold text-[#101820] outline-none transition-all focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(16,24,32,1)] focus:-translate-y-0.5 placeholder:text-gray-400 placeholder:font-semibold"
        onChange={onChange}
      />
    </div>
  );
}
