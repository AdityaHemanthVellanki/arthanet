'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CreditScoreChartProps {
  data: { date: string; score: number }[];
  width?: string | number;
  height?: number;
}

export function CreditScoreChart({ data, width = '100%', height = 300 }: CreditScoreChartProps) {
  // Custom Tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-sm">
          <p className="font-medium">{data.date}</p>
          <p className="text-blue-500">
            Score: <span className="font-semibold">{data.score}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width, height }} className="text-sm">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#6b7280' }}
          />
          <YAxis 
            domain={[300, 850]} 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#6b7280' }}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorScore)"
            strokeWidth={2}
            activeDot={{
              r: 6,
              stroke: '#fff',
              strokeWidth: 2,
              fill: '#3b82f6',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
