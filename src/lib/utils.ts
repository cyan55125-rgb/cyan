import { Customer, SaleRecord, TreeNode, MemberBreakdown, TeamResult } from "@/types";

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export function buildTree(customers: Customer[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  for (const c of customers) {
    map.set(c.id, { customer: c, children: [], level: 0 });
  }

  for (const c of customers) {
    const node = map.get(c.id)!;
    if (c.parentId === null || !map.has(c.parentId)) {
      node.level = 0;
      roots.push(node);
    } else {
      const parent = map.get(c.parentId)!;
      node.level = parent.level + 1;
      parent.children.push(node);
    }
  }

  return roots;
}

export function getDescendantIds(customerId: string, customers: Customer[]): Set<string> {
  const ids = new Set<string>([customerId]);
  const childMap = new Map<string, string[]>();

  for (const c of customers) {
    if (c.parentId !== null) {
      if (!childMap.has(c.parentId)) childMap.set(c.parentId, []);
      childMap.get(c.parentId)!.push(c.id);
    }
  }

  const queue = [customerId];
  while (queue.length > 0) {
    const current = queue.shift()!;
    const children = childMap.get(current);
    if (children) {
      for (const childId of children) {
        ids.add(childId);
        queue.push(childId);
      }
    }
  }

  return ids;
}

export function getTeamSales(
  customerId: string,
  customers: Customer[],
  sales: SaleRecord[]
): TeamResult {
  const descendantIds = getDescendantIds(customerId, customers);
  const customerMap = new Map(customers.map((c) => [c.id, c]));

  const memberMap = new Map<string, { amount: number; count: number; level: number }>();

  descendantIds.forEach((id) => {
    memberMap.set(id, { amount: 0, count: 0, level: 0 });
  });

  for (const sale of sales) {
    if (descendantIds.has(sale.customerId)) {
      const entry = memberMap.get(sale.customerId)!;
      entry.amount += sale.amount;
      entry.count += 1;
    }
  }

  const members: MemberBreakdown[] = [];
  let totalAmount = 0;

  for (const [id, data] of memberMap) {
    const c = customerMap.get(id);
    let lvl = data.level;
    if (c && c.parentId !== null) {
      let pid = c.parentId;
      while (pid !== null) {
        lvl++;
        const p = customerMap.get(pid);
        pid = p?.parentId ?? null;
      }
    }
    members.push({
      customerId: id,
      customerName: c?.name ?? "未知",
      totalAmount: data.amount,
      saleCount: data.count,
      level: lvl,
    });
    totalAmount += data.amount;
  }

  members.sort((a, b) => a.level - b.level);

  return { totalAmount, members };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
