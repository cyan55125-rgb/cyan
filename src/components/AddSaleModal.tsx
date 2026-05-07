import { useState, useRef, useEffect } from "react";
import { X, CalendarDays, Search, ChevronDown, Plus } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { toInputDateString } from "@/lib/utils";

export default function AddSaleModal() {
  const show = useAppStore((s) => s.showAddSale);
  const close = useAppStore((s) => s.closeAddSale);
  const addSale = useAppStore((s) => s.addSale);
  const addCustomer = useAppStore((s) => s.addCustomer);
  const customers = useAppStore((s) => s.customers);

  const [customerSearch, setCustomerSearch] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const customerSearchRef = useRef<HTMLDivElement>(null);

  const [productName, setProductName] = useState("");
  const [amountStr, setAmountStr] = useState("");
  const [dateValue, setDateValue] = useState(toInputDateString(new Date().toISOString()));

  useEffect(() => {
    if (!show) {
      setCustomerSearch("");
      setCustomerId("");
      setProductName("");
      setAmountStr("");
      setDateValue(toInputDateString(new Date().toISOString()));
      setDropdownOpen(false);
    }
  }, [show]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (customerSearchRef.current && !customerSearchRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) &&
      (!customerId || c.id !== customerId)
  );

  const selectedCustomer = customers.find((c) => c.id === customerId);

  function handleSelectCustomer(c: { id: string; name: string }) {
    setCustomerId(c.id);
    setCustomerSearch(c.name);
    setDropdownOpen(false);
  }

  function handleClearCustomer() {
    setCustomerId(null as unknown as string);
    setCustomerSearch("");
  }

  function handleCreateNew(name: string) {
    const id = addCustomer(name.trim(), null);
    setCustomerId(id);
    setCustomerSearch(name.trim());
    setDropdownOpen(false);
  }

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = productName.trim();
    const amount = parseFloat(amountStr);
    if (!name || !customerId || isNaN(amount) || amount <= 0) return;
    addSale(customerId, name, amount, new Date(dateValue).toISOString());
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2" ref={customerSearchRef}>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              客户名称 *
            </label>
            <div className="relative">
              <div className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-sm focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
                <Search size={15} className="shrink-0 text-slate-500" />
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => {
                    setCustomerSearch(e.target.value);
                    setDropdownOpen(true);
                    if (customerId && e.target.value !== selectedCustomer?.name) {
                      setCustomerId("");
                    }
                  }}
                  onFocus={() => setDropdownOpen(true)}
                  placeholder="输入或搜索客户名称..."
                  autoFocus
                  className="flex-1 bg-transparent outline-none text-slate-100 placeholder:text-slate-600 min-w-0"
                />
                {customerId && (
                  <button
                    type="button"
                    onClick={handleClearCustomer}
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
                <div className="absolute z-10 mt-1.5 w-full max-h-52 overflow-y-auto rounded-xl bg-slate-800 border border-slate-700/60 shadow-xl shadow-black/30 custom-scrollbar">
                  {filteredCustomers.length > 0 && (
                    <>
                      <div className="px-3 py-1.5 text-[10px] text-slate-600 uppercase tracking-wider font-semibold">
                        已有客户
                      </div>
                      {filteredCustomers.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onMouseDown={() => handleSelectCustomer(c)}
                          className={`w-full text-left px-4 py-2.5 flex items-center gap-2.5 transition-colors cursor-pointer ${
                            customerId === c.id
                              ? "bg-emerald-500/10 text-emerald-300"
                              : "hover:bg-slate-700/50 text-slate-300"
                          }`}
                        >
                          <span className="truncate">{c.name}</span>
                        </button>
                      ))}
                    </>
                  )}

                  {customerSearch.trim() && !customers.some(
                    (c) => c.name.toLowerCase() === customerSearch.trim().toLowerCase()
                  ) && (
                    <>
                      {filteredCustomers.length > 0 && (
                        <div className="border-t border-slate-700/40 my-1" />
                      )}
                      <button
                        type="button"
                        onMouseDown={() => handleCreateNew(customerSearch)}
                        className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 text-emerald-400 hover:bg-emerald-500/8 transition-colors cursor-pointer"
                      >
                        <Plus size={14} className="shrink-0" />
                        <span>新建客户 "{customerSearch.trim()}"</span>
                      </button>
                    </>
                  )}

                  {!customerSearch.trim() && filteredCustomers.length === 0 && (
                    <div className="px-4 py-3 text-center text-sm text-slate-500">
                      输入关键词搜索或创建新客户
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                产品名称 *
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="产品名称"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-slate-100 placeholder:text-slate-600 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                销售日期
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dateValue}
                  onChange={(e) => setDateValue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer"
                />
                <CalendarDays
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
              </div>
            </div>
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
