import { useState } from "react";
import { X } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function AddCustomerModal() {
  const show = useAppStore((s) => s.showAddCustomer);
  const close = useAppStore((s) => s.closeAddCustomer);
  const addCustomer = useAppStore((s) => s.addCustomer);
  const customers = useAppStore((s) => s.customers);

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<string>("");

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    addCustomer(trimmed, parentId || null);
    setName("");
    setParentId("");
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
      />
      <div className="relative w-full max-w-md mx-4 rounded-2xl bg-[#1e293b] border border-slate-700/50 shadow-2xl shadow-black/40 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/40">
          <h3 className="text-base font-bold text-slate-100 font-[Outfit]">
            新增客户
          </h3>
          <button
            onClick={close}
            className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              客户名称 *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入客户名称"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-slate-100 placeholder:text-slate-600 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              上级客户（可选）
            </label>
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer"
            >
              <option value="">无上级（顶级成员）</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-600">
              选择后，该客户将成为所选客户的下级
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={close}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700/50 text-slate-400 text-sm font-medium hover:bg-slate-700/30 hover:text-slate-200 transition-all cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              确认添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
