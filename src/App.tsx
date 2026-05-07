import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import Header from "@/components/Header";
import CustomerTree from "@/components/CustomerTree";
import CustomerDetail from "@/components/CustomerDetail";
import EmptyState from "@/components/EmptyState";
import AddCustomerModal from "@/components/AddCustomerModal";
import AddSaleModal from "@/components/AddSaleModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import UndoToast from "@/components/UndoToast";
import DataSnapshotPanel from "@/components/DataSnapshotPanel";

export default function App() {
  const initialize = useAppStore((s) => s.initialize);
  const customers = useAppStore((s) => s.customers);
  const showConfirmDialog = useAppStore((s) => s.showConfirmDialog);
  const undoAction = useAppStore((s) => s.undoAction);
  const showSnapshotPanel = useAppStore((s) => s.showSnapshotPanel);

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

      {showConfirmDialog && <ConfirmDialog />}
      {undoAction && <UndoToast />}
      {showSnapshotPanel && <DataSnapshotPanel />}
    </div>
  );
}
