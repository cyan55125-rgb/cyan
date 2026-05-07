import { UserPlus, Users, ArrowRight } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function EmptyState() {
  const openAddCustomer = useAppStore((s) => s.openAddCustomer);

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative inline-block">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/50 flex items-center justify-center mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-3xl" />
            <Users size={48} className="text-slate-600" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <UserPlus size={18} className="text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-100 font-[Outfit]">
            开始管理您的团队
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            添加客户并建立团队层级关系，记录每日销售数据，
            <br />
            一键查看任意客户及其下级团队的业绩汇总
          </p>
        </div>

        <div className="bg-slate-800/40 rounded-xl border border-slate-700/40 p-5 text-left space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            快速开始
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold">
                1
              </span>
              <div>
                <p className="text-sm text-slate-300">添加顶级客户</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  不选择上级，创建为顶级团队成员
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold">
                2
              </span>
              <div>
                <p className="text-sm text-slate-300">添加下级成员</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  选择已有客户作为上级，建立层级关系
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold">
                3
              </span>
              <div>
                <p className="text-sm text-slate-300">录入销售数据</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  为每个客户添加销售记录和金额
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={openAddCustomer}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer mx-auto"
        >
          添加第一个客户
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
