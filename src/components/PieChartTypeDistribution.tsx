import React, { useMemo } from 'react';
import type { Message } from '../types';
import { messages } from '../data/messages';

type FilterKey = '0' | '1' | '2' | 'errors';

interface PieChartProps {
  filters: Record<FilterKey, boolean>;
}

const COLORS = ['#4ade80', '#60a5fa', '#f97316', '#ef4444']; // зеленый, синий, оранж, красн(ошибки)

const PieChartTypeDistribution: React.FC<PieChartProps> = ({ filters }) => {
  const filteredMessages = useMemo(() => {
    return messages.filter(msg => {
      if (msg.isError) return filters['errors'];
      return filters[msg.type as FilterKey];
    });
  }, [filters]);

  const counts = useMemo(() => {
    const countMap: Record<FilterKey, number> = { '0': 0, '1': 0, '2': 0, errors: 0 };
    filteredMessages.forEach(msg => {
      if (msg.isError) countMap.errors++;
      else countMap[msg.type as FilterKey]++;
    });
    return countMap;
  }, [filteredMessages]);

  const total = counts['0'] + counts['1'] + counts['2'] + counts.errors;

  if (total === 0) return <p>Нет данных для отображения</p>;

  const angles = [
    (counts['0'] / total) * 360,
    (counts['1'] / total) * 360,
    (counts['2'] / total) * 360,
    (counts.errors / total) * 360,
  ];

  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'L', x, y,
      'Z',
    ].join(' ');
  }

  let cumulativeAngle = 0;
  const labels = ['Тип 0', 'Тип 1', 'Тип 2', 'Ошибки'];
  const keys: FilterKey[] = ['0', '1', '2', 'errors'];

  return (
    <svg width={300} height={300} viewBox="0 0 300 300" className="mx-auto">
      {angles.map((angle, i) => {
        if (angle === 0) {
          cumulativeAngle += angle;
          return null;
        }
        const path = describeArc(150, 150, 140, cumulativeAngle, cumulativeAngle + angle);
        cumulativeAngle += angle;
        return (
          <path key={i} d={path} fill={COLORS[i]} stroke="#fff" strokeWidth={1} />
        );
      })}
      <g transform="translate(10, 10)">
        {labels.map((label, i) => (
          <g key={i} transform={`translate(0, ${i * 25})`}>
            <rect width={20} height={20} fill={COLORS[i]} />
            <text x={30} y={15} fontSize={14} fill="#000">{label}: {counts[keys[i]]}</text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default PieChartTypeDistribution;
