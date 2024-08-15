'use client'

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, TooltipProps, Sector } from 'recharts';

interface CustomTooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps extends TooltipProps<any, any> {
  active?: boolean;
  payload?: { payload: CustomTooltipPayload }[];
}

const RADIAN = Math.PI / 180;
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

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface ChartComponentProps {
  data: ChartData[];
}


const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  // Retrieve the status from the data's payload
  const status = payload.name; 

  // Determine the percentage string format
  const percentage = percent * 100;
  const percentageString = percentage < 1 ? percentage.toFixed(2) : Math.round(percentage);

  // Combine percentage and status
  const valueString = `${percentageString}% ${status}`;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
        {valueString}
      </text>
    </g>
  );
};


const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => (
  <div className="w-full h-[400px] relative"> {/* Increased size to accommodate labels */}
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          // label={renderCustomizedLabel}
          outerRadius={140}
          innerRadius={100}
          fill="#8884d8"
          dataKey="value"
          activeShape={renderActiveShape}
          activeIndex={[0, 1, 2]} // Make all sectors active
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