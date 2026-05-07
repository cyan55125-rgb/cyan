import { useState } from "react";
import clsx from "clsx";
import { X, Camera, Trash2, RotateCcw, Clock } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { loadSnapshots } from "@/lib/storage";
import type { DataSnapshot } from "@/types";

export default function DataSnapshotPanel() {
  const show = useAppStore((s) => s.showSnapshotPanel);
  const setShowSnapshotPanel = useAppStore((s) => s.setShowSnapshotPanel);
  const createSnapshot = useAppStore((s) => s.createSnapshot);
  const loadSnapshot = useAppStore((s) => s.loadSnapshot);
  const deleteSnapshot = useAppStore((s) => s.deleteSnapshot);

  const [snapshots, setSnapshots] = useState<DataSnapshot[]>(() => loadSnapshots());

  if (!show) return null;

  function handleCreate() {
    const name = window.prompt("请输入快照名称：");
    if (!name || !name.trim()) return;
    createSnapshot(name.trim());
    setSnapshots(loadSnapshots());
  }

  function handleRestore(snapshot: DataSnapshot) {
    loadSnapshot(snapshot);
  }

  function handleDelete(id: string) {
    if (!window.confirm("确定删除此快照？")) return;
    deleteSnapshot(id);
    setSnapshots(loadSnapshots());
  }

  function formatTime(iso: string) {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowSnapshotPanel(false)}
      />
      <div className="absolute right-0 top-0 h-full w-[380px] bg-[#0f172a] shadow-2xl shadow-black/50 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/40 shrink-0">
          <h3 className="text-base font-bold text-slate-100 font-[Outfit]">数据快照</h3>
          <button
            onClick={() => setShowSnapshotPanel(false)}
            className={clsx(
              "p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            )}
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-4 shrink-0">
          <button
            onClick={handleCreate}
            className={clsx(
              "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl",
              "bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold",
              "shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all cursor-pointer"
            )}
          >
            <Camera size={16} />
            创建当前快照
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-3 custom-scrollbar">
          {snapshots.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <Clock size={36} className="mb-3 opacity-30" />
              <p className="text-sm">暂无快照记录</p>
              <p className="text-xs mt-1 text-slate-600">点击上方按钮保存当前数据状态</p>
            </div>
          ) : (
            snapshots.map((snap) => (
              <div
                key={snap.id}
                className="rounded-xl bg-[#1e293b] border border-slate-700/40 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-100 truncate">{snap.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <Clock size={11} />
                      {formatTime(snap.createdAt)}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-1">
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 font-medium">
                      {snap.customerCount} 客户
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 text-blue-400 text-xs px-2 py-0.5 font-medium">
                      {snap.saleCount} 销售
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleRestore(snap)}
                    className={clsx(
                      "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg",
                      "bg-slate-700/50 text-slate-300 text-xs font-medium",
                      "hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors cursor-pointer"
                    )}
                  >
                    <RotateCcw size={13} />
                    恢复
                  </button>
                  <button
                    onClick={() => handleDelete(snap.id)}
                    className={clsx(
                      "flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg",
                      "bg-slate-700/50 text-slate-400 text-xs font-medium",
                      "hover:bg-red-500/20 hover:text-red-400 transition-colors cursor-pointer"
                    )}
                  >
                    <Trash2 size={13} />
                    删除
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-700/30 shrink-0">
          <p className="text-[11px] text-slate-600 leading-relaxed">
            快照会保存当前所有客户和销售数据。恢复快照将覆盖当前数据，最多保留 20 个快照。
          </p>
        </div>
      </div>
    </div>
  );
}
