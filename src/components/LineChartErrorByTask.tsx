import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Message } from "../types";

interface LineChartErrorByTaskProps {
  messages: Message[];
}

const LineChartErrorByTask: React.FC<LineChartErrorByTaskProps> = ({ messages }) => {
  // Фильтрация только ошибок
  const errorMessages = messages.filter(msg => msg.isError);

  // Подсчёт ошибок по номеру задачи
  const taskErrorCounts = errorMessages.reduce<Record<number, number>>((acc, msg) => {
    if (msg.taskNumber === undefined) return acc;
    acc[msg.taskNumber] = (acc[msg.taskNumber] || 0) + 1;
    return acc;
  }, {});

  // Формируем массив для графика
  const data = Object.entries(taskErrorCounts).map(([taskNumber, count]) => ({
    taskNumber: Number(taskNumber),
    count,
  }));

  // Сортируем по номеру задачи
  const sortedData = data.sort((a, b) => a.taskNumber - b.taskNumber);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>Ошибки по номеру задачи</h2>
      <ResponsiveContainer>
        <LineChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="taskNumber" label={{ value: "Номер задачи", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Количество ошибок", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartErrorByTask;
