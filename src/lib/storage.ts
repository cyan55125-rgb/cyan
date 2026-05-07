import { Customer, SaleRecord, DataSnapshot } from "@/types";

const CUSTOMERS_KEY = "sales_customers";
const SALES_KEY = "sales_records";
const SNAPSHOTS_KEY = "sales_snapshots";

export function loadCustomers(): Customer[] {
  try {
    const raw = localStorage.getItem(CUSTOMERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomers(customers: Customer[]): void {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
}

export function loadSales(): SaleRecord[] {
  try {
    const raw = localStorage.getItem(SALES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSales(sales: SaleRecord[]): void {
  localStorage.setItem(SALES_KEY, JSON.stringify(sales));
}

export function loadSnapshots(): DataSnapshot[] {
  try {
    const raw = localStorage.getItem(SNAPSHOTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSnapshots(snapshots: DataSnapshot[]): void {
  localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(snapshots));
}

export function createSnapshot(
  name: string,
  customers: Customer[],
  sales: SaleRecord[]
): DataSnapshot {
  const snapshot: DataSnapshot = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2, 8),
    name,
    createdAt: new Date().toISOString(),
    customers: structuredClone(customers),
    sales: structuredClone(sales),
    customerCount: customers.length,
    saleCount: sales.length,
  };
  const existing = loadSnapshots();
  const updated = [snapshot, ...existing].slice(0, 20);
  saveSnapshots(updated);
  return snapshot;
}

export function deleteSnapshot(id: string): void {
  const snapshots = loadSnapshots().filter((s) => s.id !== id);
  saveSnapshots(snapshots);
}
