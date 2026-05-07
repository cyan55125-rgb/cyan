import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import Header from "@/components/Header";
import CustomerTree from "@/components/CustomerTree";
import CustomerDetail from "@/components/CustomerDetail";
import EmptyState from "@/components/EmptyState";
import AddCustomerModal from "@/components/AddCustomerModal";
import AddSaleModal from "@/components/AddSaleModal";

export default function App() {
  const initialize = useAppStore((s) => s.initialize);
  const customers = useAppStore((s) => s.customers);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const isEmpty = customers.length === 0;

  return (
    <div className="h-screen w-screen bg-[#0f172a] text-slate-200 flex flex-col overflow-hidden">
      <Header />

      {isEmpty ? (
        <EmptyState />
      ) : (
        <div className="flex flex-1 min-h-0">
          <aside className="w-[300px] shrink-0 border-r border-slate-700/40 bg-[#0f172a]/60 flex flex-col overflow-hidden">
            <CustomerTree />
          </aside>
          <CustomerDetail />
        </div>
      )}

      <AddCustomerModal />
      <AddSaleModal />
    </div>
  );
}
