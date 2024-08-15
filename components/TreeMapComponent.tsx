'use client'

import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

const TreeMapComponent = ({ data }) => {
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
          ratio={4 / 3}
          stroke="#fff"
          content={<CustomizedContent />}
          animationDuration={0} // Disable animation
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

const CustomizedContent = ({ root, depth, x, y, width, height, index, name, size, color }) => {
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

const CustomTooltip = ({ active, payload }) => {
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