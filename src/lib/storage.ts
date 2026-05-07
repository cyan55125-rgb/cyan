import { Customer, SaleRecord } from "@/types";

const CUSTOMERS_KEY = "sales_customers";
const SALES_KEY = "sales_records";

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
