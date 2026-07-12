import { useEffect, useState } from "react";
import { toast } from "../../lib/toast";

export function Toaster() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    return toast.subscribe((newToast) => {
      const id = Date.now() + Math.random().toString();
      setToasts((prev) => [...prev, { ...newToast, id }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    });
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-xl shadow-lg border text-sm font-semibold tracking-wide flex items-center gap-2 pointer-events-auto bg-white transition-all duration-300 transform translate-y-0 opacity-100 ${
            t.type === "success"
              ? "border-emerald-100 text-emerald-800"
              : "border-red-100 text-red-800"
          }`}
        >
          {t.type === "success" ? (
            <span className="text-emerald-500 font-bold">✓</span>
          ) : (
            <span className="text-red-500 font-bold">✕</span>
          )}
          {t.message}
        </div>
      ))}
    </div>
  );
}
