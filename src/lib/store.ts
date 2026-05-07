import { create } from "zustand";
import { Customer, SaleRecord } from "@/types";
import * as storage from "@/lib/storage";
import { generateId } from "@/lib/utils";

interface AppStore {
  customers: Customer[];
  sales: SaleRecord[];
  selectedCustomerId: string | null;
  showAddCustomer: boolean;
  showAddSale: boolean;

  initialize: () => void;
  selectCustomer: (id: string | null) => void;
  openAddCustomer: () => void;
  closeAddCustomer: () => void;
  openAddSale: () => void;
  closeAddSale: () => void;
  addCustomer: (name: string, parentId: string | null) => void;
  updateCustomer: (id: string, name: string, parentId: string | null) => void;
  deleteCustomer: (id: string) => void;
  addSale: (customerId: string, productName: string, amount: number) => void;
  deleteSale: (id: string) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  customers: [],
  sales: [],
  selectedCustomerId: null,
  showAddCustomer: false,
  showAddSale: false,

  initialize: () => {
    const customers = storage.loadCustomers();
    const sales = storage.loadSales();
    set({ customers, sales });
  },

  selectCustomer: (id) => set({ selectedCustomerId: id }),

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
  },

  updateCustomer: (id, name, parentId) => {
    const { customers } = get();
    const updated = customers.map((c) =>
      c.id === id ? { ...c, name, parentId } : c
    );
    storage.saveCustomers(updated);
    set({ customers: updated });
  },

  deleteCustomer: (id) => {
    let { customers, sales } = get();
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
    set({
      customers,
      sales,
      selectedCustomerId:
        get().selectedCustomerId && descendantIds.has(get().selectedCustomerId!)
          ? null
          : get().selectedCustomerId,
    });
  },

  addSale: (customerId, productName, amount) => {
    const { sales } = get();
    const newSale: SaleRecord = {
      id: generateId(),
      customerId,
      productName,
      amount,
      date: new Date().toISOString(),
    };
    const updated = [...sales, newSale];
    storage.saveSales(updated);
    set({ sales: updated });
  },

  deleteSale: (id) => {
    const { sales } = get();
    const updated = sales.filter((s) => s.id !== id);
    storage.saveSales(updated);
    set({ sales: updated });
  },
}));
