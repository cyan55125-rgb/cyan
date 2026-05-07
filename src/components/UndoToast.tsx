import { RotateCcw, X } from "lucide-react";
import clsx from "clsx";
import { useAppStore } from "@/lib/store";

export default function UndoToast() {
  const undoAction = useAppStore((s) => s.undoAction);
  const undoDelete = useAppStore((s) => s.undoDelete);
  const clearUndo = useAppStore((s) => s.clearUndo);

  if (!undoAction) return null;

  const targetName =
    undoAction.type === "deleteCustomer"
      ? (undoAction.data as { name: string }).name
      : (undoAction.data as { productName: string }).productName;

  const label =
    undoAction.type === "deleteCustomer" ? "客户" : "产品";

  return (
    <div
      className={clsx(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-4 px-5 py-3.5 rounded-2xl",
        "bg-[#1e293b] border border-slate-700/50 shadow-xl shadow-black/40",
        "animate-in slide-in-from-bottom-4 fade-in duration-300"
      )}
    >
      <span className="text-sm text-slate-300 whitespace-nowrap">
        已删除{" "}
        <span className="font-semibold text-slate-100">
          {targetName}
        </span>{" "}
        ({label})
      </span>

      <button
        onClick={undoDelete}
        className={clsx(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer",
          "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 hover:text-emerald-300"
        )}
      >
        <RotateCcw size={14} />
        撤销
      </button>

      <button
        onClick={clearUndo}
        className={clsx(
          "shrink-0 p-1 rounded-md text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
        )}
      >
        <X size={14} />
      </button>
    </div>
  );
}
