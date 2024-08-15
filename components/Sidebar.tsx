'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronLeft, ChevronRight, Home, BarChart2, Users, FileText, 
  Shield, Code, PieChart, Zap, Database, AlertTriangle, Menu
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const dashboards = [
  { name: 'My Dashboards', icon: Home, href: '/' },
  { name: 'Summary', icon: BarChart2, href: '/summary' },
  { name: 'Course Data', icon: FileText, href: '/course-data' },
  { name: 'Company Culture', icon: Users, href: '/company-culture' },
  { name: 'Learner Satisfaction', icon: PieChart, href: '/learner-satisfaction' },
  { name: 'Campaign Data', icon: Zap, href: '/campaign-data' },
  { name: 'Disclosures', icon: Shield, href: '/disclosures' },
  { name: 'E&C Culture', icon: Shield, href: '/ec-culture' },
  { name: 'Smart Code', icon: Code, href: '/smart-code' },
  { name: 'Model Insights', icon: PieChart, href: '/model-insights' },
  { name: 'Hotline', icon: AlertTriangle, href: '/hotline' },
  { name: 'Program Maturity', icon: BarChart2, href: '/program-maturity' },
  { name: 'Bring Your Own Data', icon: Database, href: '/byod' },
  { name: 'Risk Indicator', icon: AlertTriangle, href: '/risk-indicator' },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={`bg-gray-100 h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <span className="text-xl font-bold">Reveal</span>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {dashboards.map((dashboard) => (
          <Tooltip key={dashboard.name}>
            <TooltipTrigger asChild>
              <Link href={dashboard.href}
                className={`flex items-center p-4 hover:bg-gray-200 ${
                  pathname === dashboard.href ? 'bg-gray-200' : ''
                }`}
              >
                <dashboard.icon size={20} />
                {!isCollapsed && <span className="ml-4">{dashboard.name}</span>}
              </Link>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>{dashboard.name}</p>
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>
      <div className="p-4">
        <button className="flex items-center" onClick={() => setIsCollapsed(!isCollapsed)}>
          <Menu size={20} />
          {!isCollapsed && <span className="ml-4">Collapse Menu</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;