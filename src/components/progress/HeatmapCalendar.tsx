import { useState, useMemo } from 'react';
import Card from '@/components/common/Card';

interface ActivityData {
  date: string;
  count: number;
}

interface HeatmapCalendarProps {
  activityData?: ActivityData[];
  className?: string;
}

const WEEK_DAYS = ['一', '二', '三', '四', '五', '六', '日'];

const LEVEL_COLORS = [
  'bg-slate-100',
  'bg-emerald-200',
  'bg-emerald-400',
  'bg-emerald-600',
  'bg-emerald-800',
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 15) return 1;
  if (count <= 30) return 2;
  if (count <= 60) return 3;
  return 4;
}

function generateMockActivity(): ActivityData[] {
  const data: ActivityData[] = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseChance = isWeekend ? 0.55 : 0.78;
    const hasActivity = Math.random() < baseChance;
    data.push({
      date: d.toISOString().split('T')[0],
      count: hasActivity ? Math.floor(Math.random() * 75) + 5 : 0,
    });
  }
  return data;
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function HeatmapCalendar({ activityData, className }: HeatmapCalendarProps) {
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  const data = useMemo(() => activityData || generateMockActivity(), [activityData]);

  const weeks = useMemo(() => {
    const result: (ActivityData | null)[][] = [];
    let currentWeek: (ActivityData | null)[] = [];

    data.forEach((item) => {
      const dayOfWeek = new Date(item.date + 'T00:00:00').getDay();
      const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

      while (currentWeek.length < adjustedDay) {
        currentWeek.push(null);
      }
      currentWeek.push(item);

      if (adjustedDay === 6) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      result.push(currentWeek);
    }

    return result;
  }, [data]);

  const monthLabels = useMemo(() => {
    const labels: { month: string; weekIndex: number }[] = [];
    weeks.forEach((week, idx) => {
      const firstNonNull = week.find((d) => d !== null);
      if (firstNonNull) {
        const month = new Date(firstNonNull.date + 'T00:00:00').getMonth();
        const prevMonth = idx > 0 ? weeks[idx - 1].find((d) => d !== null) : null;
        const prevMonthNum = prevMonth ? new Date(prevMonth.date + 'T00:00:00').getMonth() : -1;
        if (month !== prevMonthNum) {
          labels.push({ month: `${month + 1}月`, weekIndex: idx });
        }
      }
    });
    return labels;
  }, [weeks]);

  return (
    <Card className={`${className || ''}`} padding="md">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">学习热力日历</h3>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-1 min-w-max">
          <div className="flex flex-col gap-1 pt-5">
            {WEEK_DAYS.map((day) => (
              <span key={day} className="text-[10px] text-slate-400 w-5 text-center leading-none py-[3px]">
                {day}
              </span>
            ))}
          </div>

          <div className="relative">
            <div className="absolute top-[-18px] left-0 right-0 flex">
              {weeks.map((_, idx) => {
                const label = monthLabels.find((l) => l.weekIndex === idx);
                return (
                  <span key={idx} className="w-[11px] text-[10px] text-slate-400 mr-[3px]">
                    {label?.month || ''}
                  </span>
                );
              })}
            </div>

            <div className="flex gap-[3px]">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIdx) => {
                    if (!day) {
                      return <div key={dayIdx} className="w-[11px] h-[11px] rounded-sm" />;
                    }
                    const level = getLevel(day.count);
                    return (
                      <div
                        key={dayIdx}
                        className={`w-[11px] h-[11px] rounded-sm cursor-pointer transition-all duration-150 ${LEVEL_COLORS[level]} hover:ring-2 hover:ring-emerald-400 hover:ring-offset-1`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredCell({
                            date: day.date,
                            count: day.count,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 8,
                          });
                        }}
                        onMouseLeave={() => setHoveredCell(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-400">少</span>
        <div className="flex gap-1">
          {LEVEL_COLORS.map((c, i) => (
            <div key={i} className={`w-[11px] h-[11px] rounded-sm ${c}`} />
          ))}
        </div>
        <span className="text-xs text-slate-400">多</span>
      </div>

      {hoveredCell && (
        <div
          className="fixed z-50 bg-slate-800 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none whitespace-nowrap"
          style={{
            left: `${hoveredCell.x}px`,
            top: `${hoveredCell.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {formatDateLabel(hoveredCell.date)} · {hoveredCell.count > 0 ? `${hoveredCell.count}分钟` : '未学习'}
        </div>
      )}
    </Card>
  );
}
