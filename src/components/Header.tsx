import { Users, UserPlus, Receipt } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function Header() {
  const openAddCustomer = useAppStore((s) => s.openAddCustomer);
  const openAddSale = useAppStore((s) => s.openAddSale);
  const customers = useAppStore((s) => s.customers);

  return (
    <header className="h-16 border-b border-slate-700/50 bg-[#0f172a]/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Users size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-100 tracking-tight font-[Outfit]">
            销售团队管理
          </h1>
          <p className="text-[10px] text-slate-500 -mt-0.5 tracking-wider uppercase">
            Team Sales Manager
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {customers.length > 0 && (
          <button
            onClick={openAddSale}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-400/40 transition-all duration-200 cursor-pointer"
          >
            <Receipt size={16} />
            新增销售
          </button>
        )}
        <button
          onClick={openAddCustomer}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <UserPlus size={16} />
          新增客户
        </button>
      </div>
    </header>
  );
}
