import { create } from "zustand";
import {
  Customer,
  SaleRecord,
  DateFilterType,
  DateRange,
  DataSnapshot,
  UndoAction,
} from "@/types";
import * as storage from "@/lib/storage";
import { generateId, exportToCSV, exportToHTMLTable } from "@/lib/utils";

let undoTimerId: ReturnType<typeof setTimeout> | null = null;

function clearUndoTimer() {
  if (undoTimerId !== null) {
    clearTimeout(undoTimerId);
    undoTimerId = null;
  }
}

function scheduleAutoClear(get: () => AppStoreInternal, delayMs: number) {
  clearUndoTimer();
  const actionTimestamp = get().undoAction?.timestamp;
  undoTimerId = setTimeout(() => {
    const current = get().undoAction;
    if (current && current.timestamp === actionTimestamp) {
      get().clearUndo();
    }
  }, delayMs);
}

interface AppStoreInternal {
  customers: Customer[];
  sales: SaleRecord[];
  selectedCustomerId: string | null;
  showAddCustomer: boolean;
  showAddSale: boolean;
  showConfirmDialog: boolean;
  confirmTarget: { type: string; id: string; name: string } | null;
  showSnapshotPanel: boolean;
  undoAction: UndoAction | null;

  dateFilterType: DateFilterType;
  customDateRange: DateRange | null;

  initialize: () => void;
  selectCustomer: (id: string | null) => void;
  openAddCustomer: () => void;
  closeAddCustomer: () => void;
  openAddSale: () => void;
  closeAddSale: () => void;
  addCustomer: (name: string, parentId: string | null) => string;
  updateCustomer: (id: string, name: string, parentId: string | null) => void;
  confirmDeleteCustomer: (id: string, name: string) => void;
  deleteCustomer: (id: string) => void;
  cancelDelete: () => void;
  addSale: (
    customerId: string,
    productName: string,
    amount: number,
    date: string
  ) => void;
  deleteSale: (id: string) => void;
  undoDelete: () => void;
  clearUndo: () => void;

  setDateFilter: (type: DateFilterType, range?: DateRange) => void;
  setShowSnapshotPanel: (show: boolean) => void;
  createSnapshot: (name: string) => void;
  loadSnapshot: (snapshot: DataSnapshot) => void;
  deleteSnapshot: (id: string) => void;

  exportData: (format: "csv" | "html") => void;
}

type AppStore = Omit<AppStoreInternal, "clearUndo">;

export const useAppStore = create<AppStoreInternal>((set, get) => ({
  customers: [],
  sales: [],
  selectedCustomerId: null,
  showAddCustomer: false,
  showAddSale: false,
  showConfirmDialog: false,
  confirmTarget: null,
  showSnapshotPanel: false,
  undoAction: null,

  dateFilterType: "all" as DateFilterType,
  customDateRange: null,

  initialize: () => {
    const customers = storage.loadCustomers();
    const sales = storage.loadSales();
    set({ customers, sales });
  },

  selectCustomer: (id) => {
    set({ selectedCustomerId: id, dateFilterType: "all", customDateRange: null });
  },

  openAddCustomer: () => set({ showAddCustomer: true }),
  closeAddCustomer: () => set({ showAddCustomer: false }),
  openAddSale: () => set({ showAddSale: true }),
  closeAddSale: () => set({ showAddSale: false }),

  addCustomer: (name, parentId) => {
    const { customers } = get();
    const newCustomer: Customer = {
      id: generateId(),
      name,
      parentId,
    };
    const updated = [...customers, newCustomer];
    storage.saveCustomers(updated);
    set({ customers: updated });
    return newCustomer.id;
  },

  updateCustomer: (id, name, parentId) => {
    const { customers } = get();
    const updated = customers.map((c) =>
      c.id === id ? { ...c, name, parentId } : c
    );
    storage.saveCustomers(updated);
    set({ customers: updated });
  },

  confirmDeleteCustomer: (id, name) => {
    set({
      showConfirmDialog: true,
      confirmTarget: { type: "customer", id, name },
    });
  },

  deleteCustomer: (id) => {
    let { customers, sales } = get();
    const target = customers.find((c) => c.id === id);
    if (!target) return;

    const descendantIds = new Set<string>();
    const queue = [id];
    while (queue.length > 0) {
      const current = queue.shift()!;
      descendantIds.add(current);
      for (const c of customers) {
        if (c.parentId === current && !descendantIds.has(c.id)) {
          queue.push(c.id);
        }
      }
    }

    customers = customers.filter((c) => !descendantIds.has(c.id));
    sales = sales.filter((s) => !descendantIds.has(s.customerId));

    storage.saveCustomers(customers);
    storage.saveSales(sales);

    const currentSelected = get().selectedCustomerId;
    set({
      customers,
      sales,
      showConfirmDialog: false,
      confirmTarget: null,
      undoAction: {
        type: "deleteCustomer",
        data: target,
        relatedIds: [...descendantIds],
        timestamp: Date.now(),
      },
      selectedCustomerId:
        currentSelected && descendantIds.has(currentSelected)
          ? null
          : currentSelected,
    });

    scheduleAutoClear(get, 30000);
  },

  cancelDelete: () => {
    set({ showConfirmDialog: false, confirmTarget: null });
  },

  addSale: (customerId, productName, amount, date) => {
    const { sales } = get();
    const newSale: SaleRecord = {
      id: generateId(),
      customerId,
      productName,
      amount,
      date: date || new Date().toISOString(),
    };
    const updated = [...sales, newSale];
    storage.saveSales(updated);
    set({ sales: updated });
  },

  deleteSale: (id) => {
    const { sales } = get();
    const target = sales.find((s) => s.id === id);
    if (!target) return;

    const updated = sales.filter((s) => s.id !== id);
    storage.saveSales(updated);

    set({
      sales: updated,
      undoAction: {
        type: "deleteSale",
        data: target,
        timestamp: Date.now(),
      },
    });

    scheduleAutoClear(get, 15000);
  },

  undoDelete: () => {
    const { undoAction, customers, sales } = get();
    if (!undoAction) return;

    clearUndoTimer();

    if (undoAction.type === "deleteSale") {
      const data = undoAction.data as SaleRecord;
      const updated = [data, ...sales];
      storage.saveSales(updated);
      set({ sales: updated, undoAction: null });
    } else if (undoAction.type === "deleteCustomer") {
      const data = undoAction.data as Customer;
      const relatedIds = undoAction.relatedIds || [];
      const existingIds = new Set(customers.map((c) => c.id));
      const restoredCustomers: Customer[] = [];

      for (const rid of relatedIds) {
        if (!existingIds.has(rid)) {
          const found = relatedIds.length > 1 ? null : data;
          if (found) restoredCustomers.push(found);
        }
      }

      if (!existingIds.has(data.id)) {
        restoredCustomers.push(data);
      }

      const allRestored = [...customers, ...restoredCustomers];
      storage.saveCustomers(allRestored);
      set({ customers: allRestored, undoAction: null });
    }
  },

  clearUndo: () => {
    clearUndoTimer();
    set({ undoAction: null });
  },

  setDateFilter: (type, range) => {
    set({ dateFilterType: type, customDateRange: range || null });
  },

  setShowSnapshotPanel: (show) => set({ showSnapshotPanel: show }),

  createSnapshot: (name: string) => {
    const { customers, sales } = get();
    storage.createSnapshot(name, customers, sales);
  },

  loadSnapshot: (snapshot) => {
    storage.saveCustomers(snapshot.customers);
    storage.saveSales(snapshot.sales);
    set({
      customers: snapshot.customers,
      sales: snapshot.sales,
      selectedCustomerId: null,
      showSnapshotPanel: false,
    });
  },

  deleteSnapshot: (id: string) => {
    storage.deleteSnapshot(id);
  },

  exportData: (format) => {
    const { customers, sales, selectedCustomerId, dateFilterType, customDateRange } =
      get();

    let exportSales = sales;
    let title = "销售数据导出";

    if (selectedCustomerId) {
      const customer = customers.find((c) => c.id === selectedCustomerId);
      if (customer) {
        title = `${customer.name}-销售数据`;
        const descIds = collectDescendantIds(selectedCustomerId, customers);
        exportSales = sales.filter(
          (s) => descIds.has(s.customerId)
        );
      }
    }

    if (dateFilterType !== "all") {
      const now = new Date();
      let start: Date;
      let end: Date;

      if (dateFilterType === "thisMonth") {
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        title += `-本月`;
      } else if (dateFilterType === "lastMonth") {
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
        title += `-上月`;
      } else if (customDateRange) {
        start = new Date(customDateRange.start);
        end = new Date(customDateRange.end + "T23:59:59.999");
        title += `-自定义`;
      }

      const startTime = start.getTime();
      const endTime = end.getTime();
      exportSales = exportSales.filter((s) => {
        const t = new Date(s.date).getTime();
        return t >= startTime && t <= endTime;
      });
    }

    const customerMap = new Map(customers.map((c) => [c.id, c.name]));
    const data = exportSales.map((s) => ({
      name: customerMap.get(s.customerId) ?? "未知",
      productName: s.productName,
      amount: s.amount,
      date: s.date,
    }));

    if (format === "csv") {
      exportToCSV(data, title);
    } else {
      exportToHTMLTable(title, data);
    }
  },
}));

function collectDescendantIds(
  ancestorId: string,
  customers: Customer[]
): Set<string> {
  const ids = new Set<string>([ancestorId]);
  const childMap = new Map<string, string[]>();
  for (const c of customers) {
    if (c.parentId !== null) {
      if (!childMap.has(c.parentId)) childMap.set(c.parentId, []);
      childMap.get(c.parentId)!.push(c.id);
    }
  }
  const queue = [ancestorId];
  while (queue.length > 0) {
    const current = queue.shift()!;
    const children = childMap.get(current);
    if (children) {
      for (const cid of children) {
        ids.add(cid);
        queue.push(cid);
      }
    }
  }
  return ids;
}
