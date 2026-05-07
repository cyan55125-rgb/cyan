import { useState } from "react";
import { X } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function AddSaleModal() {
  const show = useAppStore((s) => s.showAddSale);
  const close = useAppStore((s) => s.closeAddSale);
  const addSale = useAppStore((s) => s.addSale);
  const customers = useAppStore((s) => s.customers);

  const [customerId, setCustomerId] = useState("");
  const [productName, setProductName] = useState("");
  const [amountStr, setAmountStr] = useState("");

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = productName.trim();
    const amount = parseFloat(amountStr);
    if (!name || !customerId || isNaN(amount) || amount <= 0) return;
    addSale(customerId, name, amount);
    setCustomerId("");
    setProductName("");
    setAmountStr("");
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
            新增销售记录
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
              选择客户 *
            </label>
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer"
            >
              <option value="">请选择客户</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              产品名称 *
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="请输入产品名称"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-slate-100 placeholder:text-slate-600 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              销售金额 (¥) *
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-slate-100 placeholder:text-slate-600 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all tabular-nums"
            />
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
              disabled={
                !productName.trim() ||
                !customerId ||
                !amountStr ||
                parseFloat(amountStr) <= 0
              }
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              确认录入
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
