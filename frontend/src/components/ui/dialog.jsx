import * as React from "react";

export function Dialog({ open, children }) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      {children}
    </div>
  );
}

export function DialogContent({ children, onClose }) {
  return (
    <div className="bg-white rounded-[24px] border border-[#E9E4DA] p-6 max-w-md w-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col gap-6 relative">
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-[#5B6A60] hover:text-[#1D2D24] transition-colors"
        >
          ✕
        </button>
      )}
      {children}
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="flex flex-col gap-1.5 text-left">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-semibold text-[#1D2D24]">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="text-sm text-[#5B6A60]">{children}</p>;
}
