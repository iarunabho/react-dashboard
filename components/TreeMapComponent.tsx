'use client';

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
          isAnimationActive={false}
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
    const { x, y, width, height, name = '', size, color } = props;
  
    // Helper function to wrap text
    const wrapText = (text: string, width: number) => {
      const lines: string[] = [];
      const words = text.split(' ');
  
      let line = '';
  
      words.forEach(word => {
        const testLine = line + (line ? ' ' : '') + word;
        const testWidth = measureTextWidth(testLine);
  
        if (testWidth > width) {
          lines.push(line);
          line = word;
        } else {
          line = testLine;
        }
      });
  
      lines.push(line);
  
      return lines;
    };
  
    // Function to measure text width (using a temporary canvas)
    const measureTextWidth = (text: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return 0;
      context.font = '12px sans-serif';
      return context.measureText(text).width;
    };
  
    const lines = wrapText(name, width - 10);
  
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
            <g transform={`translate(${x},${y})`}>
              {lines.map((line, index) => (
                <text
                  key={index}
                  x={width / 2}
                  y={(height / 2) + (index - lines.length / 2) * 14}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={12}
                  dominantBaseline="central"
                >
                  {line}
                </text>
              ))}
              <text
                x={width / 2}
                y={(height / 2) + (lines.length - 1) * 14 + 15}
                textAnchor="middle"
                fill="#fff"
                fontSize={12}
              >
                {size}
              </text>
            </g>
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
