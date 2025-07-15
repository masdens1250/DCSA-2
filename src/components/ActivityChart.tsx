import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ActivityChart: React.FC = () => {
  const data = [
    { name: '09:00', searches: 45, profiles: 12, alerts: 3 },
    { name: '10:00', searches: 78, profiles: 23, alerts: 5 },
    { name: '11:00', searches: 123, profiles: 34, alerts: 8 },
    { name: '12:00', searches: 156, profiles: 45, alerts: 12 },
    { name: '13:00', searches: 189, profiles: 56, alerts: 15 },
    { name: '14:00', searches: 234, profiles: 67, alerts: 18 },
    { name: '15:00', searches: 198, profiles: 54, alerts: 14 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 p-3 rounded-lg shadow-lg">
          <p className="text-white font-medium">{`Heure: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Activité Système - Aujourd'hui</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF" 
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="searches" fill="#3B82F6" name="Recherches" />
            <Bar dataKey="profiles" fill="#10B981" name="Profils" />
            <Bar dataKey="alerts" fill="#F59E0B" name="Alertes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-slate-400">Recherches</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-slate-400">Profils</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-slate-400">Alertes</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;