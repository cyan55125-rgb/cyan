import {
  Customer,
  SaleRecord,
  TreeNode,
  MemberBreakdown,
  TeamResult,
  DateFilterType,
  DateRange,
} from "@/types";

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

function filterSalesByDate(
  sales: SaleRecord[],
  filterType: DateFilterType,
  customRange?: DateRange
): SaleRecord[] {
  if (filterType === "all") return sales;

  const now = new Date();
  let start: Date;
  let end: Date;

  if (filterType === "thisMonth") {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  } else if (filterType === "lastMonth") {
    start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  } else if (filterType === "custom" && customRange) {
    start = new Date(customRange.start);
    end = new Date(customRange.end + "T23:59:59.999");
  } else {
    return sales;
  }

  const startTime = start.getTime();
  const endTime = end.getTime();

  return sales.filter((s) => {
    const t = new Date(s.date).getTime();
    return t >= startTime && t <= endTime;
  });
}

export function getTeamSales(
  customerId: string,
  customers: Customer[],
  sales: SaleRecord[],
  filterType?: DateFilterType,
  customRange?: DateRange
): TeamResult {
  const filteredSales = filterSalesByDate(sales, filterType || "all", customRange);

  const descendantIds = getDescendantIds(customerId, customers);
  const customerMap = new Map(customers.map((c) => [c.id, c]));

  const memberMap = new Map<string, { amount: number; count: number; level: number }>();

  descendantIds.forEach((id) => {
    memberMap.set(id, { amount: 0, count: 0, level: 0 });
  });

  for (const sale of filteredSales) {
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

export function getPersonalSales(
  customerId: string,
  sales: SaleRecord[],
  filterType?: DateFilterType,
  customRange?: DateRange
): SaleRecord[] {
  const personal = sales.filter((s) => s.customerId === customerId);
  return filterSalesByDate(personal, filterType || "all", customRange);
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

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function toInputDateString(dateStr: string): string {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getDateRangeLabel(filterType: DateFilterType): string {
  switch (filterType) {
    case "all":
      return "全部数据";
    case "thisMonth":
      return "本月";
    case "lastMonth":
      return "上月";
    case "custom":
      return "自定义";
  }
}

export function exportToCSV(
  data: { name: string; productName: string; amount: number; date: string }[],
  filename: string
): void {
  const BOM = "\uFEFF";
  const header = "客户名称,产品名称,销售金额(元),销售日期\n";
  const rows = data
    .map(
      (r) =>
        `"${r.name}","${r.productName}",${r.amount},"${formatDate(r.date)}"`
    )
    .join("\n");
  const csv = BOM + header + rows;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function exportToHTMLTable(
  title: string,
  data: { name: string; productName: string; amount: number; date: string }[]
): void {
  const rows = data
    .map(
      (r) =>
        `<tr><td>${r.name}</td><td>${r.productName}</td><td>${formatCurrency(r.amount)}</td><td>${formatDate(r.date)}</td></tr>`
    )
    .join("");

  const total = data.reduce((sum, r) => sum + r.amount, 0);

  const html = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="UTF-8"><title>${title}</title>
<style>body{font-family:"Microsoft YaHei",sans-serif;padding:40px;color:#333}
h1{color:#10b981;text-align:center;margin-bottom:30px}
table{width:100%;border-collapse:collapse;margin-top:20px}
th{background:#10b981;color:white;padding:12px;text-align:left;border:1px solid #ddd}
td{padding:10px;border:1px solid #ddd}
tr:nth-child(even){background:#f9f9f9}
.total-row{background:#ecfdf5;font-weight:bold;font-size:16px}</style></head>
<body>
<h1>${title}</h1>
<table><tr><th>客户名称</th><th>产品名称</th><th>销售金额</th><th>销售日期</th></tr>${rows}
<tr class="total-row"><td colspan="2">合计</td><td>${formatCurrency(total)}</td><td></td></tr>
</table></body></html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${title}.html`;
  link.click();
  URL.revokeObjectURL(link.href);
}
