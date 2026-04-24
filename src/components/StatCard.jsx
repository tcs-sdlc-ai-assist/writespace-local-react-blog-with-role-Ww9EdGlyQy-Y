import React from 'react';

export default function StatCard({ title, value, icon, color = 'indigo' }) {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-500',
      iconBg: 'bg-indigo-100',
    },
    violet: {
      bg: 'bg-violet-50',
      text: 'text-violet-600',
      border: 'border-violet-500',
      iconBg: 'bg-violet-100',
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-500',
      iconBg: 'bg-green-100',
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-500',
      iconBg: 'bg-red-100',
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-500',
      iconBg: 'bg-blue-100',
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      border: 'border-yellow-500',
      iconBg: 'bg-yellow-100',
    },
  };

  const colors = colorMap[color] || colorMap.indigo;

  return (
    <div className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border-l-4 ${colors.border} overflow-hidden`}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <p className={`text-3xl font-bold mt-1 ${colors.text}`}>{value}</p>
          </div>
          {icon && (
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.iconBg}`}>
              <span className="text-2xl">{icon}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}