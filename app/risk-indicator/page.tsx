'use client'

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronDown, PlusCircle } from 'lucide-react';

const RiskCategory = ({ title, percentage, status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'above-target': return 'bg-emerald-500';
      case 'on-target': return 'bg-yellow-500';
      case 'below-target': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className={`${getStatusColor(status)} text-white`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold">{title}</h3>
            <p>{status}</p>
          </div>
          <div className="text-2xl font-bold">{percentage}%</div>
        </div>
      </CardContent>
    </Card>
  );
};

const RiskIndicatorDashboard = () => {
  const categories = [
    { title: 'Training', percentage: 83, status: 'Above-Target' },
    { title: 'Communication', percentage: 83, status: 'Above-Target' },
    { title: 'Culture', percentage: 76, status: 'Below-Target' },
    { title: 'Program Maturity', percentage: 85, status: 'On-Target' },
    { title: 'Reporting', percentage: 80, status: 'Above-Target' },
    { title: 'Third Party', percentage: 55, status: 'Below-Target' },
    { title: 'Policy and Code', percentage: 99, status: 'Above-Target' },
  ];

  const programMaturityItems = [
    { name: 'Program Management, Resources & Board Oversight', weight: 10 },
    { name: 'Written Standards', weight: 12 },
    { name: 'Training and Communications', weight: 22 },
    { name: 'Enforcement, Discipline & Incentives', weight: 21 },
    { name: 'Culture & Leadership', weight: 10 },
    { name: 'Risk Assessment & Reporting', weight: 25 },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Ethical Risk Indicator by Category</h1>
          <div className="flex items-center text-sm bg-gray-800 px-3 py-2 rounded-md">
            <span>Filters</span>
            <ChevronDown size={16} className="ml-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <RiskCategory key={index} {...category} />
          ))}
          <Card className="bg-gray-800 border-2 border-dashed border-gray-700 flex items-center justify-center">
            <CardContent>
              <button className="flex items-center text-gray-400">
                <PlusCircle size={24} className="mr-2" />
                Add Category
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Interactive Risk Calculator</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800">
              <CardHeader>
                <h3 className="text-xl font-bold">Your Category</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {programMaturityItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <span className="font-bold">{item.weight}%</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gray-800">
              <CardHeader>
                <h3 className="text-xl font-bold">Weightage</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {programMaturityItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <input 
                        type="number" 
                        value={item.weight} 
                        className="w-16 bg-gray-700 text-white rounded px-2 py-1" 
                        readOnly
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskIndicatorDashboard;