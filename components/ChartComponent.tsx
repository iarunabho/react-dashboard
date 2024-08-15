'use client'

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';

// Define the interface for the tooltip payload
interface CustomTooltipPayload {
  name: string;
  value: number;
  color: string;
}

// Define the interface for the tooltip props
interface CustomTooltipProps extends TooltipProps<any, any> {
  active?: boolean;
  payload?: { payload: CustomTooltipPayload }[];
}

// Custom Tooltip component
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as CustomTooltipPayload;
    return (
      <div className="bg-white p-2 shadow-md rounded-md border border-gray-200">
        <p className="font-bold">{data.name}</p>
        <p>{`Value: ${data.value}`}</p>
        <p>{`Percentage: ${data.value}%`}</p>
      </div>
    );
  }
  return null;
};

// Define the interface for the chart data
interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface ChartComponentProps {
  data: ChartData[];
}

// Chart component
const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => (
  <div className="relative w-72 h-72">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          innerRadius={80}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
          <tspan x="50%" dy="-10" className="text-3xl font-bold">504</tspan>
          <tspan x="50%" dy="30" className="text-sm">Complete</tspan>
          <tspan x="50%" dy="20" className="text-xs text-gray-500">/630</tspan>
        </text>
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default ChartComponent;
