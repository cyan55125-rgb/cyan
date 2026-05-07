import { TrendingUp, ArrowDown, UserCheck } from "lucide-react";
import { MemberBreakdown } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { clsx } from "clsx";

export default function TeamSummary({
  members,
  totalAmount,
  currentCustomerId,
}: {
  members: MemberBreakdown[];
  totalAmount: number;
  currentCustomerId: string;
}) {
  if (members.length <= 1) {
    return null;
  }

  const subMembers = members.filter(
    (m) => m.customerId !== currentCustomerId
  );

  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-800/30 border border-slate-700/50 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-700/40 flex items-center gap-2">
        <TrendingUp size={16} className="text-emerald-400" />
        <h3 className="text-sm font-semibold text-slate-200">团队汇总</h3>
        <span className="ml-auto text-xs text-slate-500">
          {subMembers.length} 位下级成员
        </span>
      </div>

      <div className="divide-y divide-slate-700/30 max-h-[280px] overflow-y-auto custom-scrollbar">
        {members.map((member) => {
          const isSelf = member.customerId === currentCustomerId;
          return (
            <div
              key={member.customerId}
              className={clsx(
                "flex items-center gap-3 px-5 py-3 transition-colors",
                isSelf && "bg-emerald-500/5"
              )}
            >
              <div
                className={clsx(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  isSelf
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-slate-700/60 text-slate-400"
                )}
              >
                {isSelf ? <UserCheck size={15} /> : <ArrowDown size={15} />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "text-sm font-medium truncate",
                      isSelf ? "text-emerald-300" : "text-slate-300"
                    )}
                  >
                    {member.customerName}
                    {isSelf && (
                      <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-normal">
                        本人
                      </span>
                    )}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {member.saleCount} 笔交易
                </div>
              </div>

              <div className="text-right shrink-0">
                <div
                  className={clsx(
                    "text-sm font-bold tabular-nums",
                    isSelf ? "text-emerald-400" : "text-slate-200"
                  )}
                >
                  {formatCurrency(member.totalAmount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 py-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-t border-emerald-500/20">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-300">
            团队总销售额
          </span>
          <span className="text-xl font-bold text-emerald-400 tabular-nums">
            {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}
