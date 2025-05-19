// src/components/BarChartSignalTimeline.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface BarChartSignalTimelineProps {
  filters: Record<string, boolean>;
}

const generateHourlyData = () => {
  const hours = Array.from({ length: 12 }, (_, i) => 8 + i); // 8:00–19:00
  return hours.map(hour => ({
    time: `${hour}:00`,
    signal_on: Math.floor(Math.random() * 10),
    signal_off: Math.floor(Math.random() * 5),
  }));
};

const BarChartSignalTimeline: React.FC<BarChartSignalTimelineProps> = ({ filters }) => {
  let data = generateHourlyData();

  // Если оба фильтра выключены — отображаем пустую гистограмму
  if (!filters.connect && !filters.disconnect) {
    data = data.map(d => ({ ...d, signal_on: 0, signal_off: 0 }));
  }

  return (
    <div className="flex flex-col items-center">
      <BarChart width={700} height={350} data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        {filters.connect && <Bar dataKey="signal_on" fill="#82ca9d" name="Подключения" />}
        {filters.disconnect && <Bar dataKey="signal_off" fill="#ff6666" name="Отключения" />}
      </BarChart>
    </div>
  );
};

export default BarChartSignalTimeline;
