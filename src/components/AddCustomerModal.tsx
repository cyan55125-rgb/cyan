import { useState, useRef, useEffect } from "react";
import { X, Search, ChevronDown } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Customer } from "@/types";

export default function AddCustomerModal() {
  const show = useAppStore((s) => s.showAddCustomer);
  const close = useAppStore((s) => s.closeAddCustomer);
  const addCustomer = useAppStore((s) => s.addCustomer);
  const customers = useAppStore((s) => s.customers);

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);
  const [parentSearch, setParentSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) {
      setName("");
      setParentId(null);
      setParentSearch("");
      setDropdownOpen(false);
    }
  }, [show]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!show) return null;

  const filteredParents = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(parentSearch.toLowerCase()) &&
      (!parentId || c.id !== parentId)
  );

  const selectedParent = customers.find((c) => c.id === parentId);

  function handleSelectParent(c: Customer) {
    setParentId(c.id);
    setParentSearch(c.name);
    setDropdownOpen(false);
  }

  function handleClearParent() {
    setParentId(null);
    setParentSearch("");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    addCustomer(trimmed, parentId);
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

          <div className="space-y-2" ref={dropdownRef}>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              上级客户（可搜索）
            </label>
            <div className="relative">
              <div className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-sm focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
                <Search size={15} className="shrink-0 text-slate-500" />
                <input
                  type="text"
                  value={parentSearch}
                  onChange={(e) => {
                    setParentSearch(e.target.value);
                    setDropdownOpen(true);
                    if (parentId && e.target.value !== selectedParent?.name) {
                      setParentId(null);
                    }
                  }}
                  onFocus={() => setDropdownOpen(true)}
                  placeholder="输入名称搜索上级..."
                  className="flex-1 bg-transparent outline-none text-slate-100 placeholder:text-slate-600 min-w-0"
                />
                {parentId && (
                  <button
                    type="button"
                    onClick={handleClearParent}
                    className="shrink-0 p-0.5 rounded hover:bg-slate-700/50 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
                <ChevronDown
                  size={15}
                  className={`shrink-0 text-slate-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </div>

              {dropdownOpen && (
                <div className="absolute z-10 mt-1.5 w-full max-h-48 overflow-y-auto rounded-xl bg-slate-800 border border-slate-700/60 shadow-xl shadow-black/30 custom-scrollbar">
                  {filteredParents.length === 0 ? (
                    <div className="px-4 py-3 text-center text-sm text-slate-500">
                      {parentSearch ? "未找到匹配的客户" : "暂无可选上级"}
                    </div>
                  ) : (
                    filteredParents.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onMouseDown={() => handleSelectParent(c)}
                        className={`w-full text-left px-4 py-2.5 flex items-center gap-2.5 transition-colors cursor-pointer ${
                          parentId === c.id
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "hover:bg-slate-700/50 text-slate-300"
                        }`}
                      >
                        <span className="truncate">{c.name}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-600">
              输入关键词搜索并选择上级，不选则为顶级成员
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
