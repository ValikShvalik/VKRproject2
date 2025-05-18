import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const dummyData = [
  { time: '10:00', signal_on: 2, signal_off: 1 },
  { time: '10:05', signal_on: 3, signal_off: 0 },
  { time: '10:10', signal_on: 1, signal_off: 2 },
];

const BarChartSignalTimeline: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <BarChart width={500} height={300} data={dummyData}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="signal_on" fill="#82ca9d" name="Подключения" />
        <Bar dataKey="signal_off" fill="#ff6666" name="Отключения" />
      </BarChart>
    </div>
  );
};

export default BarChartSignalTimeline;
