import { AlertTriangle, X } from "lucide-react";
import clsx from "clsx";
import { useAppStore } from "@/lib/store";

export default function ConfirmDialog() {
  const showConfirmDialog = useAppStore((s) => s.showConfirmDialog);
  const confirmTarget = useAppStore((s) => s.confirmTarget);
  const deleteCustomer = useAppStore((s) => s.deleteCustomer);
  const cancelDelete = useAppStore((s) => s.cancelDelete);

  if (!showConfirmDialog || !confirmTarget) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={cancelDelete}
      />
      <div className="relative w-full max-w-md mx-4 rounded-2xl bg-[#1e293b] border border-slate-700/50 shadow-2xl shadow-black/40 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={cancelDelete}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="px-6 pt-8 pb-6 text-center space-y-5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 ring-1 ring-red-500/20">
            <AlertTriangle size={28} className="text-red-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-100 font-[Outfit]">
              确定删除吗？
            </h3>
            <p className="text-base font-semibold text-red-400">
              {confirmTarget.name}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              将同时删除其所有下级成员及关联的销售数据
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={cancelDelete}
              className={clsx(
                "flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer",
                "border-slate-600/60 text-slate-400",
                "hover:bg-slate-700/30 hover:text-slate-200"
              )}
            >
              取消
            </button>
            <button
              onClick={() => deleteCustomer(confirmTarget.id)}
              className={clsx(
                "flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg transition-all cursor-pointer",
                "bg-gradient-to-r from-red-500 to-rose-600",
                "shadow-red-500/25 hover:shadow-red-500/40 hover:from-red-600 hover:to-rose-700"
              )}
            >
              确认删除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
