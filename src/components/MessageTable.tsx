import React from 'react';
import type { Message } from '../types';

interface Props {
  messages: Message[];
  filterTypes: string[]; // фильтруем по типам '0', '1', '2', 'errors'
}

const sortMessages = (msgs: Message[]) => {
  // Сначала ошибки, потом отрицательные(1), положительные(2), нейтральные(0)
  return msgs.slice().sort((a, b) => {
    if (a.isError && !b.isError) return -1;
    if (!a.isError && b.isError) return 1;
    if (a.isError && b.isError) return 0;
    const order = ['1', '2', '0'];
    return order.indexOf(a.type) - order.indexOf(b.type);
  });
};

const MessageTable: React.FC<Props> = ({ messages, filterTypes }) => {
  const filtered = messages.filter((m) => {
    if (m.isError && filterTypes.includes('errors')) return true;
    return filterTypes.includes(m.type);
  });

  const sortedMessages = sortMessages(filtered);

  return (
    <table className="w-full border-collapse border border-gray-300 text-sm">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2">№</th>
          <th className="border border-gray-300 p-2">Время</th>
          <th className="border border-gray-300 p-2">Тип</th>
          <th className="border border-gray-300 p-2">Номер задачи</th>
          <th className="border border-gray-300 p-2">Длина бинарных данных</th>
          <th className="border border-gray-300 p-2">Бинарные данные сообщения</th>
          <th className="border border-gray-300 p-2">Сообщение разработчику</th>
        </tr>
      </thead>
      <tbody>
        {sortedMessages.map((msg, idx) => (
          <tr key={msg.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="border border-gray-300 p-2">{msg.id}</td>
            <td className="border border-gray-300 p-2">{new Date(msg.timestamp).toLocaleString()}</td>
            <td className="border border-gray-300 p-2">{msg.isError ? 'Ошибка' : `Тип ${msg.type}`}</td>
            <td className="border border-gray-300 p-2">{msg.taskNumber}</td>
            <td className="border border-gray-300 p-2">{msg.binaryData.length}</td>
            <td className="border border-gray-300 p-2"><pre className="whitespace-pre-wrap break-all">{msg.binaryData}</pre></td>
            <td className="border border-gray-300 p-2">{msg.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MessageTable;
