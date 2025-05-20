import React, { useMemo, useState } from 'react';
import { messages } from '../data/messages';

interface BarChartSignalTimelineProps {
  filters: Record<string, boolean>;
  startHour?: number; // начало диапазона
  endHour?: number;   // конец диапазона
}

// Цвета и метки — без изменений
const COLORS: Record<string, string> = {
  errors: '#8b0000',
  '0': '#8884d8',
  '1': '#82ca9d',
  '2': '#ffc658',
};
const TYPE_LABELS: Record<string, string> = {
  errors: 'Ошибки',
  '0': 'Нейтральные',
  '1': 'Положительные',
  '2': 'Отрицательные',
};

const BarChartSignalTimeline: React.FC<BarChartSignalTimelineProps> = ({
  filters,
  startHour = 8,  // значение по умолчанию
  endHour = 19,   // значение по умолчанию
}) => {
  const [hoveredHourIndex, setHoveredHourIndex] = useState<number | null>(null);

  // Формируем часы в диапазоне от startHour до endHour включительно
  const hours = useMemo(
    () => Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i),
    [startHour, endHour]
  );

  const filteredMessages = useMemo(() => {
    return messages.filter(msg => {
      const date = new Date(msg.timestamp);
      const hour = date.getHours();
      if (hour < startHour || hour > endHour) return false;

      if (msg.isError) return !!filters['errors'];
      return !!filters[msg.type.toString()];
    });
  }, [filters, startHour, endHour]);

  const countsByHourAndType = useMemo(() => {
    return hours.map(hour => {
      const msgsInHour = filteredMessages.filter(msg => new Date(msg.timestamp).getHours() === hour);
      const counts: Record<string, number> = { errors: 0, '0': 0, '1': 0, '2': 0 };
      msgsInHour.forEach(msg => {
        if (msg.isError) counts.errors += 1;
        else counts[msg.type.toString()] += 1;
      });
      return { hour, counts };
    });
  }, [filteredMessages, hours]);

  const maxCount = Math.max(
    ...countsByHourAndType.map(c => Object.values(c.counts).reduce((a, b) => a + b, 0)),
    1
  );

  if (filteredMessages.length === 0) {
    return <p className="text-center mt-8 text-gray-500">Нет данных для отображения</p>;
  }

  // Размеры и отрисовка — без изменений
  const width = 700;
  const height = 350;
  const margin = { top: 40, right: 20, bottom: 60, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const barWidth = chartWidth / countsByHourAndType.length;

  return (
    <>
      <h2 className="text-center font-bold text-lg mb-4">График анализа типов сообщений от времени</h2>
      <svg width={width} height={height} className="mx-auto bg-white rounded shadow">
        {/* Оси */}
        <line x1={margin.left} y1={margin.top} x2={margin.left} y2={height - margin.bottom} stroke="#333" />
        <line x1={margin.left} y1={height - margin.bottom} x2={width - margin.right} y2={height - margin.bottom} stroke="#333" />

        {/* Столбцы */}
        {countsByHourAndType.map(({ counts }, i) => {
          let yOffset = height - margin.bottom;
          return (
            <g key={i}>
              {Object.entries(counts).map(([type, count]) => {
                if (count === 0) return null;
                const barHeight = (count / maxCount) * chartHeight;
                yOffset -= barHeight;
                return (
                  <rect
                    key={type}
                    x={margin.left + i * barWidth + 5}
                    y={yOffset}
                    width={barWidth - 10}
                    height={barHeight}
                    fill={COLORS[type]}
                    onMouseEnter={() => setHoveredHourIndex(i)}
                    onMouseLeave={() => setHoveredHourIndex(null)}
                    style={{ cursor: 'pointer', transition: 'height 0.3s ease, y 0.3s ease' }}
                  />
                );
              })}
            </g>
          );
        })}

        {/* Метки X */}
        {countsByHourAndType.map(({ hour }, i) => (
          <text
            key={hour}
            x={margin.left + i * barWidth + barWidth / 2}
            y={height - margin.bottom + 15}
            fontSize={12}
            textAnchor="middle"
            fill="#333"
          >
            {hour}:00
          </text>
        ))}

        {/* Метки Y */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = margin.top + chartHeight * (1 - t);
          const value = Math.round(maxCount * t);
          return (
            <g key={i}>
              <line x1={margin.left - 5} y1={y} x2={margin.left} y2={y} stroke="#333" />
              <text x={margin.left - 10} y={y + 4} fontSize={10} textAnchor="end" fill="#333">
                {value}
              </text>
            </g>
          );
        })}

        {/* Tooltip */}
        {hoveredHourIndex !== null && (
          <foreignObject
            x={margin.left + hoveredHourIndex * barWidth + barWidth / 2}
            y={margin.top}
            width={160}
            height={110}
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="bg-white border border-gray-300 rounded p-2 shadow text-xs"
              style={{ transform: 'translateX(-50%)' }}
            >
              <div className="font-semibold mb-1">{hours[hoveredHourIndex]}:00</div>
              {Object.entries(countsByHourAndType[hoveredHourIndex].counts).map(([type, count]) => (
                <div key={type} className="flex items-center gap-2">
                  <div style={{ backgroundColor: COLORS[type] }} className="w-3 h-3 rounded-sm" />
                  <span>{TYPE_LABELS[type]}: {count}</span>
                </div>
              ))}
            </div>
          </foreignObject>
        )}
      </svg>

      {/* Легенда */}
      <div className="flex justify-center gap-6 mt-4">
        {Object.entries(COLORS).map(([type, color]) => (
          <LegendItem key={type} color={color} label={TYPE_LABELS[type]} />
        ))}
      </div>
    </>
  );
};

interface LegendItemProps {
  color: string;
  label: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ color, label }) => (
  <div className="flex items-center space-x-2">
    <div style={{ backgroundColor: color }} className="w-4 h-4 rounded-sm border border-gray-400" />
    <span className="text-sm text-gray-700">{label}</span>
  </div>
);

export default BarChartSignalTimeline;
