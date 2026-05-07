export interface Customer {
  id: string;
  name: string;
  parentId: string | null;
}

export interface SaleRecord {
  id: string;
  customerId: string;
  productName: string;
  amount: number;
  date: string;
}

export interface TreeNode {
  customer: Customer;
  children: TreeNode[];
  level: number;
}

export interface MemberBreakdown {
  customerId: string;
  customerName: string;
  totalAmount: number;
  saleCount: number;
  level: number;
}

export interface TeamResult {
  totalAmount: number;
  members: MemberBreakdown[];
}

export type DateFilterType = "all" | "thisMonth" | "lastMonth" | "custom";

export interface DateRange {
  start: string;
  end: string;
}

export interface DataSnapshot {
  id: string;
  name: string;
  createdAt: string;
  customers: Customer[];
  sales: SaleRecord[];
  customerCount: number;
  saleCount: number;
}

export interface UndoAction {
  type: "deleteCustomer" | "deleteSale";
  data: Customer | SaleRecord;
  relatedIds?: string[];
  timestamp: number;
}
