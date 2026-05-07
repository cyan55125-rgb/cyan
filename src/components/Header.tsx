import { useState, useRef, useEffect } from "react";
import { Users, UserPlus, Receipt, Search, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Customer } from "@/types";

export default function Header() {
  const openAddCustomer = useAppStore((s) => s.openAddCustomer);
  const openAddSale = useAppStore((s) => s.openAddSale);
  const customers = useAppStore((s) => s.customers);
  const selectCustomer = useAppStore((s) => s.selectCustomer);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matched = customers.filter(
      (c) => c.name.toLowerCase().includes(q)
    );
    setSearchResults(matched);
    setSearchOpen(matched.length > 0);
  }, [searchQuery, customers]);

  function handleSelect(c: Customer) {
    selectCustomer(c.id);
    setSearchQuery("");
    setSearchOpen(false);
  }

  function handleClear() {
    setSearchQuery("");
    setSearchResults([]);
    setSearchOpen(false);
  }

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
          <div ref={searchRef} className="relative">
            <div className="flex items-center gap-2 w-[240px] h-9 pl-3 pr-2 rounded-full bg-slate-800/70 border border-slate-700/50 focus-within:border-emerald-500/40 focus-within:ring-1 focus-within:ring-emerald-500/15 transition-all">
              <Search size={14} className="shrink-0 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim()) setSearchOpen(true);
                }}
                placeholder="搜索客户名称..."
                className="flex-1 bg-transparent outline-none text-slate-200 placeholder:text-slate-600 text-sm min-w-0"
              />
              {searchQuery && (
                <button
                  onClick={handleClear}
                  className="shrink-0 p-0.5 rounded-full hover:bg-slate-700/50 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 max-h-64 overflow-y-auto rounded-xl bg-slate-800/95 backdrop-blur-md border border-slate-700/60 shadow-xl shadow-black/40 custom-scrollbar z-50">
                <div className="px-3 py-2 border-b border-slate-700/40">
                  <span className="text-[11px] text-slate-500">
                    找到 {searchResults.length} 个匹配结果
                  </span>
                </div>
                {searchResults.map((c) => (
                  <button
                    key={c.id}
                    onMouseDown={() => handleSelect(c)}
                    className="w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-slate-700/50 transition-colors cursor-pointer group"
                  >
                    <span className="text-sm text-slate-200 group-hover:text-white truncate">
                      {c.name}
                    </span>
                    <span className="text-[11px] text-slate-600 group-hover:text-slate-400 shrink-0">
                      查看详情 →
                    </span>
                  </button>
                ))}
              </div>
            )}

            {searchOpen && searchQuery && searchResults.length === 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 rounded-xl bg-slate-800/95 backdrop-blur-md border border-slate-700/60 shadow-xl z-50">
                <div className="px-4 py-4 text-center text-sm text-slate-500">
                  未找到匹配的客户
                </div>
              </div>
            )}
          </div>
        )}

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
