import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface BarChartSignalTimelineProps {
  filters: Record<string, boolean>;
}

const dummyData = [
  { time: '10:00', signal_on: 2, signal_off: 1 },
  { time: '10:05', signal_on: 3, signal_off: 0 },
  { time: '10:10', signal_on: 1, signal_off: 2 },
];

const BarChartSignalTimeline: React.FC<BarChartSignalTimelineProps> = ({ filters }) => {
  const showSignalOn = filters['connect'] ?? true;
  const showSignalOff = filters['disconnect'] ?? true;

  const filteredData = dummyData.map((entry) => ({
    time: entry.time,
    signal_on: showSignalOn ? entry.signal_on : 0,
    signal_off: showSignalOff ? entry.signal_off : 0,
  }));

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Гистограмма сигналов</h2>
      <BarChart width={600} height={300} data={filteredData}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        {showSignalOn && <Bar dataKey="signal_on" fill="#82ca9d" name="Подключения" />}
        {showSignalOff && <Bar dataKey="signal_off" fill="#ff6666" name="Отключения" />}
      </BarChart>
    </div>
  );
};

export default BarChartSignalTimeline;

