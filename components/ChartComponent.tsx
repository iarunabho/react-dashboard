'use client'

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
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

const ChartComponent = ({ data }) => (
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