import { ResponsiveContainer, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

interface RadarDataPoint {
  subject: string;
  value: number;
}

interface RadarChartProps {
  data: RadarDataPoint[];
  color?: string;
  className?: string;
}

export default function RadarChart({ data, color = '#3B82F6', className }: RadarChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={280}>
        <RechartsRadar data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid
            stroke="#E2E8F0"
            strokeWidth={1}
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#64748B', fontSize: 12, fontFamily: "'Noto Sans SC', sans-serif" }}
            axisLine={false}
          />
          <Radar
            name="能力值"
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.2}
            strokeWidth={2}
            dot={false}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
