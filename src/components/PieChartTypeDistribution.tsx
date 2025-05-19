import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Message } from '../types';
import { messages } from '../data/messages';

interface Props {
  filters: Record<string, boolean>;
}

// Цвета: 0, 1, 2 и Ошибки
const COLORS: Record<string, string> = {
  'Нейтральный': '#8884d8',       // нейтральный - фиолетовый
  'Положительный': '#82ca9d',     // положительный - зелёный
  'Отрицательный': '#ffc658',     // отрицательный - жёлтый
  'Ошибки': '#8b0000',            // ошибки - тёмно-красный
  'Нет данных': '#ccc',            // серый
};

// Соответствие типа сообщения к названию
const TYPE_LABELS: Record<string, string> = {
  '0': 'Нейтральный',
  '1': 'Положительный',
  '2': 'Отрицательный',
};

const getChartData = (data: Message[], filters: Record<string, boolean>) => {
  const counts: Record<string, number> = {};
  data.forEach(msg => {
    if (msg.isError) {
      if (filters['errors']) {
        counts['Ошибки'] = (counts['Ошибки'] || 0) + 1;
      }
    } else {
      const typeKey = TYPE_LABELS[msg.type.toString()];
      if (typeKey && filters[msg.type.toString()]) {
        counts[typeKey] = (counts[typeKey] || 0) + 1;
      }
    }
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

const PieChartTypeDistribution: React.FC<Props> = ({ filters }) => {
  const data = getChartData(messages, filters);
  const isAllOff = data.length === 0;
  const displayData = isAllOff ? [{ name: 'Нет данных', value: 1 }] : data;

  return (
    <div className="w-full h-[400px]">
      <div className="w-full h-[400px] bg-white p-4 rounded shadow">
        <h2 className="text-center font-bold text-lg mb-4">Распределение типов сообщений</h2>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={displayData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
              isAnimationActive
              animationDuration={600}
            >
              {displayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#ccc'} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [value, name]}
            />
            <Legend 
              verticalAlign="bottom" 
              formatter={(value: string) => value} // отображаем уже понятные имена
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartTypeDistribution;
