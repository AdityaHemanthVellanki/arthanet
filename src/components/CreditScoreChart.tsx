'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface CreditScoreChartProps {
  data: { date: string; score: number; previousScore?: number }[];
  animationDuration?: number;
}

export const CreditScoreChart = ({ data, animationDuration = 1.5 }: CreditScoreChartProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedData, setAnimatedData] = useState<{ date: string; score: number; previousScore?: number }[]>([]);

  // Animate the data appearing on the chart
  useEffect(() => {
    setIsVisible(true);
    
    // Create a delayed animation for each data point
    if (data.length > 0) {
      const animateData = async () => {
        const newData: typeof data = [];
        for (let i = 0; i < data.length; i++) {
          newData.push(data[i]);
          setAnimatedData([...newData]);
          // Add a small delay between each data point
          await new Promise(resolve => setTimeout(resolve, animationDuration * 100 / data.length));
        }
      };
      
      animateData();
    }
  }, [data, animationDuration]);

  // Custom tooltip component with enhanced styling
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-800/90 backdrop-blur-md border border-slate-700/50 p-4 rounded-lg shadow-xl"
        >
          <p className="font-medium text-slate-300 mb-1">{data.date}</p>
          <p className="text-xl font-semibold text-indigo-400">Score: {data.score}</p>
          
          {/* Score indicator */}
          {data.previousScore && (
            <div className="mt-2 pt-2 border-t border-slate-700">
              <div className="flex items-center space-x-1 text-xs">
                {data.score > data.previousScore ? (
                  <>
                    <span className="text-emerald-400">+{data.score - data.previousScore}</span>
                    <span className="text-slate-400">from previous</span>
                  </>
                ) : data.score < data.previousScore ? (
                  <>
                    <span className="text-rose-400">{data.score - data.previousScore}</span>
                    <span className="text-slate-400">from previous</span>
                  </>
                ) : (
                  <span className="text-slate-400">No change from previous</span>
                )}
              </div>
            </div>
          )}
        </motion.div>
      );
    }
    return null;
  };

  // Generate gradient colors based on score ranges
  const renderGradient = () => (
    <defs>
      <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(99, 102, 241, 0.8)" />
        <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
        <stop offset="100%" stopColor="rgba(236, 72, 153, 0.2)" />
      </linearGradient>
      <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
        <stop offset="100%" stopColor="rgba(99, 102, 241, 0.01)" />
      </linearGradient>
    </defs>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart 
          data={animatedData} 
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        >
          {renderGradient()}
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#333" 
            opacity={0.2} 
            vertical={false}
          />
          
          <XAxis 
            dataKey="date" 
            axisLine={{ stroke: '#444' }} 
            tick={{ fill: '#888', fontSize: 12 }} 
            tickLine={{ stroke: '#444' }} 
            tickMargin={10}
          />
          
          <YAxis 
            domain={[400, 850]} 
            axisLine={{ stroke: '#444' }} 
            tick={{ fill: '#888', fontSize: 12 }} 
            tickLine={{ stroke: '#444' }} 
            tickCount={5}
            width={40}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: '#666', strokeWidth: 1, strokeDasharray: '5 5' }}
          />
          
          <Area 
            type="monotone" 
            dataKey="score" 
            stroke="url(#scoreGradient)" 
            strokeWidth={3} 
            fillOpacity={1}
            fill="url(#scoreAreaGradient)"
            activeDot={{
              r: 6, 
              stroke: '#8b5cf6', 
              strokeWidth: 2, 
              fill: '#6366f1',
              className: 'pulse-animation'
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
