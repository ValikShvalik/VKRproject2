import React, { useMemo } from 'react';
import type { Message } from '../types';
import { messages } from '../data/messages';

interface BarChartSignalTimelineProps {
  filters: Record<string, boolean>;
}

const BarChartSignalTimeline: React.FC<BarChartSignalTimelineProps> = ({ filters }) => {
  // Формируем 12 часов с 8:00 до 19:00
  const hours = Array.from({ length: 12 }, (_, i) => 8 + i);

  // Фильтруем сообщения по времени и типу
  const filteredMessages = useMemo(() => {
    return messages.filter(msg => {
      const date = new Date(msg.timestamp);
      const hour = date.getHours();
      if (hour < 8 || hour > 19) return false; // фильтр по времени
      if (msg.isError) return false; // исключаем ошибки из гистограммы
      return filters[msg.type];
    });
  }, [filters]);

  // Группируем по часу + считаем количество сообщений
  const countsByHour = hours.map(hour => {
    return {
      hour,
      count: filteredMessages.filter(msg => new Date(msg.timestamp).getHours() === hour).length,
    };
  });

  // Максимальное количество для масштаба по Y
  const maxCount = Math.max(...countsByHour.map(c => c.count), 1);

  // Размеры SVG
  const width = 700;
  const height = 350;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Ширина одной колонки
  const barWidth = chartWidth / countsByHour.length;

  return (
    <svg width={width} height={height} className="mx-auto bg-white rounded shadow">
      {/* Ось Y */}
      <line
        x1={margin.left}
        y1={margin.top}
        x2={margin.left}
        y2={height - margin.bottom}
        stroke="#333"
      />
      {/* Ось X */}
      <line
        x1={margin.left}
        y1={height - margin.bottom}
        x2={width - margin.right}
        y2={height - margin.bottom}
        stroke="#333"
      />

      {/* Столбцы */}
      {countsByHour.map(({ hour, count }, i) => {
        const barHeight = (count / maxCount) * chartHeight;
        return (
          <rect
            key={hour}
            x={margin.left + i * barWidth + 5}
            y={height - margin.bottom - barHeight}
            width={barWidth - 10}
            height={barHeight}
            fill="#3b82f6"
          />
        );
      })}

      {/* Метки X (часы) */}
      {countsByHour.map(({ hour }, i) => (
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
            <line
              x1={margin.left - 5}
              y1={y}
              x2={margin.left}
              y2={y}
              stroke="#333"
            />
            <text
              x={margin.left - 10}
              y={y + 4}
              fontSize={10}
              textAnchor="end"
              fill="#333"
            >
              {value}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default BarChartSignalTimeline;
