import { useMemo, useState, useCallback } from "react";
import { ChevronRight, ChevronDown, User } from "lucide-react";
import { TreeNode } from "@/types";
import { useAppStore } from "@/lib/store";
import { clsx } from "clsx";

interface TreeItemProps {
  node: TreeNode;
  depth: number;
}

function TreeItem({ node, depth }: TreeItemProps) {
  const [expanded, setExpanded] = useState(true);
  const selectedId = useAppStore((s) => s.selectedCustomerId);
  const selectCustomer = useAppStore((s) => s.selectCustomer);
  const hasChildren = node.children.length > 0;
  const isSelected = selectedId === node.customer.id;

  const handleClick = useCallback(() => {
    selectCustomer(node.customer.id);
  }, [node.customer.id, selectCustomer]);

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setExpanded((prev) => !prev);
    },
    []
  );

  const paddingLeft = useMemo(() => `${depth * 20 + 8}px`, [depth]);
  const lineLeft = useMemo(() => `${depth * 20 + 22}px`, [depth]);

  return (
    <div>
      <div
        className={clsx(
          "group flex items-center gap-1.5 py-2 px-2 mx-1 rounded-lg cursor-pointer transition-all duration-150",
          isSelected
            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
            : "hover:bg-slate-700/40 text-slate-300 hover:text-slate-100 border border-transparent"
        )}
        style={{ paddingLeft }}
        onClick={handleClick}
      >
        <span className="shrink-0 w-5 h-5 flex items-center justify-center">
          {hasChildren ? (
            expanded ? (
              <ChevronDown
                size={14}
                className="text-slate-500 group-hover:text-slate-400"
                onClick={handleToggle}
              />
            ) : (
              <ChevronRight
                size={14}
                className="text-slate-500 group-hover:text-slate-400"
                onClick={handleToggle}
              />
            )
          ) : (
            <span className="w-[3px] h-[3px] rounded-full bg-slate-600 group-hover:bg-slate-500" />
          )}
        </span>

        <span
          className={clsx(
            "w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-xs font-semibold",
            isSelected
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-slate-700/60 text-slate-400 group-hover:bg-slate-600/60"
          )}
        >
          <User size={14} />
        </span>

        <span className="text-sm font-medium truncate">{node.customer.name}</span>

        {hasChildren && (
          <span className="ml-auto text-[10px] tabular-nums text-slate-600 group-hover:text-slate-500">
            {node.children.length}
          </span>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="relative">
          <div
            className="absolute top-0 bottom-0 left-0 border-l border-dashed border-slate-700/50"
            style={{ left: lineLeft }}
          />
          {node.children.map((child) => (
            <TreeItem key={child.customer.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CustomerTree() {
  const customers = useAppStore((s) => s.customers);

  const roots = useMemo(() => {
    if (customers.length === 0) return [];

    const map = new Map<string, { customer: typeof customers[number]; children: string[] }>();
    for (const c of customers) {
      if (!map.has(c.id)) map.set(c.id, { customer: c, children: [] });
    }
    for (const c of customers) {
      if (c.parentId && map.has(c.parentId)) {
        map.get(c.parentId)!.children.push(c.id);
      }
    }

    const rootIds = customers
      .filter((c) => !c.parentId || !map.has(c.parentId))
      .map((c) => c.id);

    function buildNode(id: string): TreeNode {
      const entry = map.get(id)!;
      return {
        customer: entry.customer,
        children: entry.children.map(buildNode),
        level: 0,
      };
    }

    return rootIds.map(buildNode);
  }, [customers]);

  if (customers.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-slate-700/40">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          客户列表
        </h2>
        <p className="text-[11px] text-slate-600 mt-0.5">
          共 {customers.length} 位客户
        </p>
      </div>
      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        {roots.map((root) => (
          <TreeItem key={root.customer.id} node={root} depth={0} />
        ))}
      </div>
    </div>
  );
}
