import React from "react";
import type { Message } from "../types";
import { isErrorMessage } from "../lib/utils";

interface Props {
  messages: Message[];
  filterTypes: number[];
}

const MessageTable: React.FC<Props> = ({ messages, filterTypes }) => {
  const filtered = messages.filter(m => filterTypes.includes(m.type));

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-2 py-1">ID</th>
          <th className="border border-gray-300 px-2 py-1">Время</th>
          <th className="border border-gray-300 px-2 py-1">Тип</th>
          <th className="border border-gray-300 px-2 py-1">Текст</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map(m => (
          <tr
            key={m.id}
            className={isErrorMessage(m.text) ? "bg-red-100 text-red-700" : ""}
          >
            <td className="border border-gray-300 px-2 py-1">{m.id}</td>
            <td className="border border-gray-300 px-2 py-1">{new Date(m.timestamp).toLocaleString()}</td>
            <td className="border border-gray-300 px-2 py-1">
              {m.type === 0 ? "Нейтральный" : m.type === 1 ? "Положительный" : "Отрицательный"}
            </td>
            <td className="border border-gray-300 px-2 py-1">{m.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MessageTable;
