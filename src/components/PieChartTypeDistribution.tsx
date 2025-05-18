import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Message } from '../types';
import { messages } from '../data/messages';

interface Props {
  filters: Record<string, boolean>;
}

const COLORS: Record<string, string> = {
  '0': '#8884d8',
  '1': '#82ca9d',
  '2': '#ffc658',
  'Ошибки': '#8b0000',
};

const getChartData = (data: Message[], filters: Record<string, boolean>) => {
  const counts: Record<string, number> = {};

  data.forEach(msg => {
    const type = msg.type.toString();
    if (msg.isError && filters['errors']) {
      counts['Ошибки'] = (counts['Ошибки'] || 0) + 1;
    } else if (!msg.isError && filters[type]) {
      counts[type] = (counts[type] || 0) + 1;
    }
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

const PieChartTypeDistribution: React.FC<Props> = ({ filters }) => {
  const data = getChartData(messages, filters);
  const isAllOff = data.length === 0;

  const grayData = [{ name: 'Нет данных', value: 1 }];

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Распределение типов сообщений</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={isAllOff ? grayData : data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {(isAllOff ? grayData : data).map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={isAllOff ? '#ccc' : COLORS[entry.name] || '#ccc'}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartTypeDistribution;
