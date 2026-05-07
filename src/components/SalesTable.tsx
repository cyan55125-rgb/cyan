import { Trash2 } from "lucide-react";
import { SaleRecord } from "@/types";
import { useAppStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function SalesTable({ sales }: { sales: SaleRecord[] }) {
  const deleteSale = useAppStore((s) => s.deleteSale);

  if (sales.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-slate-600 text-sm">暂无销售记录</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-700/50">
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              产品名称
            </th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              销售金额
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              日期
            </th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr
              key={sale.id}
              className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group"
            >
              <td className="py-3 px-4 text-slate-200 font-medium">
                {sale.productName}
              </td>
              <td className="py-3 px-4 text-right text-emerald-400 font-semibold tabular-nums">
                {formatCurrency(sale.amount)}
              </td>
              <td className="py-3 px-4 text-slate-500 text-xs">
                {formatDate(sale.date)}
              </td>
              <td className="py-3 px-2">
                <button
                  onClick={() => deleteSale(sale.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all duration-150 cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
