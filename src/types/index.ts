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
