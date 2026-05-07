import { User, Link2, Trash2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getTeamSales } from "@/lib/utils";
import SalesTable from "./SalesTable";
import TeamSummary from "./TeamSummary";

export default function CustomerDetail() {
  const selectedId = useAppStore((s) => s.selectedCustomerId);
  const customers = useAppStore((s) => s.customers);
  const sales = useAppStore((s) => s.sales);
  const deleteCustomer = useAppStore((s) => s.deleteCustomer);

  if (!selectedId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center mx-auto">
            <User size={32} className="text-slate-600" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">选择一个客户</p>
            <p className="text-slate-600 text-xs mt-1">
              从左侧列表点击客户查看详情
            </p>
          </div>
        </div>
      </div>
    );
  }

  const customer = customers.find((c) => c.id === selectedId);
  if (!customer) return null;

  const parentCustomer = customer.parentId
    ? customers.find((c) => c.id === customer.parentId)
    : null;

  const personalSales = sales.filter((s) => s.customerId === selectedId);
  const personalTotal = personalSales.reduce((sum, s) => sum + s.amount, 0);
  const teamResult = getTeamSales(selectedId, customers, sales);

  return (
    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="rounded-xl bg-gradient-to-br from-slate-800/70 to-slate-800/40 border border-slate-700/50 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <User size={22} className="text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-100 font-[Outfit]">
                    {customer.name}
                  </h2>
                  {parentCustomer ? (
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
                      <Link2 size={11} />
                      上级：{parentCustomer.name}
                    </div>
                  ) : (
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                      顶级成员
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                    个人销售额
                  </div>
                  <div className="text-lg font-bold text-emerald-400 tabular-nums font-[Outfit]">
                    {personalTotal.toLocaleString("zh-CN")}
                  </div>
                </div>
                <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                    销售笔数
                  </div>
                  <div className="text-lg font-bold text-amber-400 tabular-nums font-[Outfit]">
                    {personalSales.length}
                  </div>
                </div>
                <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                    团队总额
                  </div>
                  <div className="text-lg font-bold text-teal-400 tabular-nums font-[Outfit]">
                    {teamResult.totalAmount.toLocaleString("zh-CN")}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => deleteCustomer(customer.id)}
              className="shrink-0 p-2 rounded-lg hover:bg-red-500/10 text-slate-600 hover:text-red-400 transition-all duration-150 cursor-pointer"
              title="删除此客户及其所有下级"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-800/30 border border-slate-700/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/40">
            <h3 className="text-sm font-semibold text-slate-200">
              销售记录明细
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              个人销售记录 · 共 {personalSales.length} 笔
            </p>
          </div>
          <SalesTable sales={personalSales} />
        </div>

        <TeamSummary
          members={teamResult.members}
          totalAmount={teamResult.totalAmount}
          currentCustomerId={selectedId}
        />
      </div>
    </div>
  );
}
