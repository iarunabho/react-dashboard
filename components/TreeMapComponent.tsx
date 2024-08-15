'use client'

import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

// Define the data item interface
interface DataItem {
  topic: string;
  course_count: number;
}

// Define the props interface for the TreeMapComponent
interface TreeMapComponentProps {
  data: DataItem[];
}

// Define colors for the treemap items
const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

// TreeMap component
const TreeMapComponent: React.FC<TreeMapComponentProps> = ({ data }) => {
  // Format the data for the treemap
  const formattedData = {
    name: 'Risk Areas',
    children: data.map((item, index) => ({
      name: item.topic,
      size: item.course_count,
      color: COLORS[index % COLORS.length]
    }))
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <Treemap
          data={formattedData.children}
          dataKey="size"
          stroke="#fff"
          content={<CustomizedContent />} // Use the component directly
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

// Custom content component for Treemap
const CustomizedContent: React.FC<any> = (props) => {
  const { x, y, width, height, name, size, color } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          stroke: '#fff',
          strokeWidth: 2,
          strokeOpacity: 1,
        }}
      />
      {
        width > 50 && height > 30 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={12}
          >
            <tspan x={x + width / 2} dy="-0.5em">{name}</tspan>
            <tspan x={x + width / 2} dy="1.2em">{size}</tspan>
          </text>
        )
      }
    </g>
  );
};

// Custom tooltip component
const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 shadow-md rounded-md border border-gray-200">
        <p className="font-bold">{data.name}</p>
        <p>{`Courses: ${data.size}`}</p>
      </div>
    );
  }
  return null;
};

export default TreeMapComponent;
