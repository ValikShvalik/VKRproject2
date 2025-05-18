import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { type Message } from "../data/messages";

interface Props {
  messages: Message[];
}

const COLORS = ["#8884d8", "#82ca9d", "#ff6961"]; // нейтральный, положительный, отрицательный

const MessageChart: React.FC<Props> = ({ messages }) => {
  const counts = [0, 0, 0];
  messages.forEach(m => counts[m.type]++);

  const data = [
    { name: "Нейтральный", value: counts[0] },
    { name: "Положительный", value: counts[1] },
    { name: "Отрицательный", value: counts[2] },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MessageChart;
