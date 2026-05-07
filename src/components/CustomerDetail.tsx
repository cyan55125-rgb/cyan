import { useState } from "react";
import { User, Link2, Download, FileSpreadsheet, FileText, CalendarDays, Filter } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getTeamSales, getPersonalSales, formatCurrency, formatDate, getDateRangeLabel } from "@/lib/utils";
import { DateFilterType } from "@/types";
import SalesTable from "./SalesTable";
import TeamSummary from "./TeamSummary";

export default function CustomerDetail() {
  const selectedId = useAppStore((s) => s.selectedCustomerId);
  const customers = useAppStore((s) => s.customers);
  const sales = useAppStore((s) => s.sales);
  const confirmDeleteCustomer = useAppStore((s) => s.confirmDeleteCustomer);
  const exportData = useAppStore((s) => s.exportData);
  const dateFilterType = useAppStore((s) => s.dateFilterType);
  const setDateFilter = useAppStore((s) => s.setDateFilter);

  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);

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

  const customRange =
    dateFilterType === "custom" && customStart && customEnd
      ? { start: customStart, end: customEnd }
      : null;

  const personalSales = getPersonalSales(selectedId, sales, dateFilterType, customRange || undefined);
  const personalTotal = personalSales.reduce((sum, s) => sum + s.amount, 0);
  const teamResult = getTeamSales(selectedId, customers, sales, dateFilterType, customRange || undefined);

  const handleDateFilterChange = (type: DateFilterType) => {
    setDateFilter(type);
    if (type !== "custom") {
      setCustomStart("");
      setCustomEnd("");
    }
  };

  const applyCustomRange = () => {
    if (customStart && customEnd) {
      setDateFilter("custom", { start: customStart, end: customEnd });
    }
  };

  const filterOptions: { type: DateFilterType; label: string }[] = [
    { type: "all", label: "全部" },
    { type: "thisMonth", label: "本月" },
    { type: "lastMonth", label: "上月" },
    { type: "custom", label: "自定义" },
  ];

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
              onClick={() => confirmDeleteCustomer(customer.id, customer.name)}
              className="shrink-0 p-2 rounded-lg hover:bg-red-500/10 text-slate-600 hover:text-red-400 transition-all duration-150 cursor-pointer"
              title="删除此客户及其所有下级"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-800/30 border border-slate-700/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/40 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-slate-200">
                销售记录明细
              </h3>
              <span className="text-[11px] text-slate-500">
                共 {personalSales.length} 笔 · {getDateRangeLabel(dateFilterType)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all cursor-pointer"
                >
                  <Download size={13} />
                  导出
                </button>
                {showExportMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
                    <div className="absolute right-0 top-full mt-1 w-40 rounded-xl bg-slate-800 border border-slate-700/60 shadow-xl z-50 overflow-hidden">
                      <button
                        onClick={() => { exportData("csv"); setShowExportMenu(false); }}
                        className="w-full text-left px-4 py-2.5 flex items-center gap-2 text-sm text-slate-300 hover:bg-slate-700/50 transition-colors cursor-pointer"
                      >
                        <FileSpreadsheet size={14} />
                        导出 CSV (Excel)
                      </button>
                      <button
                        onClick={() => { exportData("html"); setShowExportMenu(false); }}
                        className="w-full text-left px-4 py-2.5 flex items-center gap-2 text-sm text-slate-300 hover:bg-slate-700/50 transition-colors cursor-pointer"
                      >
                        <FileText size={14} />
                        导出 HTML 表格
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="px-5 py-3 border-b border-slate-700/30 flex items-center gap-2 flex-wrap">
            <Filter size={13} className="text-slate-500 shrink-0" />
            <span className="text-[11px] text-slate-500 shrink-0">筛选：</span>
            {filterOptions.map((opt) => (
              <button
                key={opt.type}
                onClick={() => handleDateFilterChange(opt.type)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  dateFilterType === opt.type
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                    : "bg-slate-800/60 text-slate-500 hover:text-slate-300 border border-transparent"
                }`}
              >
                {opt.label}
              </button>
            ))}
            {dateFilterType === "custom" && (
              <div className="flex items-center gap-1.5 ml-1">
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="px-2 py-1 rounded-md bg-slate-900/60 border border-slate-700/50 text-slate-200 text-xs focus:outline-none focus:border-emerald-500/40"
                />
                <span className="text-slate-600 text-xs">至</span>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="px-2 py-1 rounded-md bg-slate-900/60 border border-slate-700/50 text-slate-200 text-xs focus:outline-none focus:border-emerald-500/40"
                />
                <button
                  onClick={applyCustomRange}
                  disabled={!customStart || !customEnd}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25 disabled:opacity-40 transition-all cursor-pointer"
                >
                  确定
                </button>
              </div>
            )}
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
