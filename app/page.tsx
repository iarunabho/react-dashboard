'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Info, ChevronDown, Clock } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatDuration, intervalToDuration } from 'date-fns';

const ChartComponent = dynamic(() => import('../components/ChartComponent'), { ssr: false });
const TreeMapComponent = dynamic(() => import('../components/TreeMapComponent'), { ssr: false });
const WorldMap = dynamic(() => import('../components/WorldMap'), { ssr: false });

const Dashboard = () => {
  const completionData = [
    { name: 'Complete', value: 80, color: '#00C49F' },
    { name: 'In Progress', value: 10, color: '#1E90FF' },
    { name: 'Not Started', value: 10, color: '#FF6347' },
  ];

  const riskData = [
    { topic: 'Code of Conduct', course_count: 2 },
    { topic: 'Gifts & Entertainment/Hospitality', course_count: 2 },
    { topic: 'Harassment & Discrimination', course_count: 2 },
    { topic: 'Antitrust & Competition', course_count: 1 },
    { topic: 'Corporate Social Responsibility', course_count: 1 },
    { topic: 'Ethical Leadership', course_count: 1 },
    { topic: 'Government Contracting & Relationships', course_count: 1 }
  ];

  const geographyData = [
    { country_name: 'United States of America', learner_count: 5500 },
    { country_name: 'Spain', learner_count: 2200 },
    { country_name: 'Germany', learner_count: 1320 },
    { country_name: 'India', learner_count: 880 },
    { country_name: 'Canada', learner_count: 330 },
    { country_name: 'Brazil', learner_count: 242 },
    { country_name: 'South Korea', learner_count: 220 }
  ];

  const formatTime = (minutes) => {
    const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });
    return formatDuration(duration, { format: ['hours', 'minutes'] });
  };

  const TimeVisual = ({ title, time, infoText, longestTime }) => {
    const percentage = (time / longestTime) * 100;
    const isLongest = time === longestTime;
    const texture = `repeating-linear-gradient(
      -45deg,
      ${isLongest ? '#CCE0F4' : '#acb7bf'},
      ${isLongest ? '#CCE0F4' : '#acb7bf'} 10px,
      ${isLongest ? '#E6EEF8' : '#c8cfd2'} 10px,
      ${isLongest ? '#E6EEF8' : '#c8cfd2'} 20px
    )`;

    return (
      <Card className="shadow-md">
        <CardContent className="p-4">
          <h3 className="text-base font-semibold mb-2">{title}</h3>
          <div className="relative h-24 bg-gray-100 rounded-md">
            <div
              className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-md"
              style={{ height: `${percentage}%`, backgroundImage: texture }}
            >
              <div className="absolute inset-0"></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xl font-bold">{formatTime(time)}</div>
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm text-blue-600">
            <Info size={16} className="mr-1" />
            <span>{infoText}</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Dynamic time data
  const shortestTime = 22; // in minutes
  const longestTime = 132; // in minutes (2 hours 12 minutes)

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-bold">Course Completions</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-2/3">
                <ChartComponent data={completionData} />
              </div>
              <div className="w-full lg:w-1/3 space-y-4 mt-6 lg:mt-0">
                {completionData.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                    <div className="text-sm flex-grow">{item.name}</div>
                    <div className="text-sm font-bold">{item.value}%</div>
                  </div>
                ))}
                <div className="mt-4">
                  <div className="text-sm font-bold">83% Industry benchmark</div>
                  <Progress value={83} className="h-2 mt-1" />
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-green-500">+21</span> completions
                  <div className="text-xs text-gray-500">in the last 30 days</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Target</div>
                  <div className="font-bold text-red-500">522/85%</div>
                  <div className="text-xs text-gray-500">(-18.2%)</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-3">
                Just 18 completions to go before you reach your target.
                Why not send your learners a reminder to complete their training?
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-md">
              <CardHeader>Total Time Spent in 2024</CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-indigo-600">8,500</div>
                <div className="text-sm text-gray-500">Hours</div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader>Average Training Time (per person)</CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-indigo-600">35</div>
                  <Progress value={87.5} className="w-1/2 h-2" />
                </div>
                <div className="text-sm text-gray-500">Minutes</div>
                <div className="text-xs text-gray-500 mt-2">
                  Avg. training time (per person) has declined from 40 mins to 35 mins.
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} className="text-blue-500 mt-2 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>What is driving this reduction?</p>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TimeVisual 
              title="Shortest Time Taken"
              time={shortestTime}
              infoText="Where are courses taken quicker?"
              longestTime={longestTime}
            />
            <TimeVisual 
              title="Longest Time Taken"
              time={longestTime}
              infoText="Which courses take longer to complete?"
              longestTime={longestTime}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-bold">Risk Areas</h2>
          </CardHeader>
          <CardContent className="p-4 h-[400px]"> {/* Adjust this height as needed */}
            <TreeMapComponent data={riskData} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-bold">Learner Distribution by Country</h2>
          </CardHeader>
          <CardContent className="p-4 h-[400px]"> {/* Match this height with Risk Areas */}
            <WorldMap data={geographyData} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 text-sm text-blue-600 flex items-center">
        <Clock size={16} className="mr-2" />
        <span>Performance compared to last year?</span>
      </div>
    </div>
  );
};

export default Dashboard;