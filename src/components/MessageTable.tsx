import React, { useState } from 'react';
import type { Message } from '../types';

interface Props {
  messages: Message[];
  filterTypes: string[];          // фильтрация по типам
  startHour?: number;             // фильтр по началу диапазона времени (опционально)
  endHour?: number;               // фильтр по концу диапазона времени (опционально)
}

const PAGE_SIZE = 10;

const sortMessages = (msgs: Message[]) => {
  return msgs.slice().sort((a, b) => {
    if (a.isError && !b.isError) return -1;
    if (!a.isError && b.isError) return 1;
    if (a.isError && b.isError) return 0;
    const order = ['2', '1', '0'];
    return order.indexOf(a.type) - order.indexOf(b.type);
  });
};

const errorRowStyle = {
  backgroundColor: '#ffe5e5',
  borderLeft: '5px solid #ef4444',
  color: '#b91c1c',
  fontWeight: '700',
};

const typeIcons: Record<string, string> = {
  errors: '❌',
  '0': '😐',
  '1': '👍',
  '2': '👎',
};

const MessageTable: React.FC<Props> = ({ messages, filterTypes, startHour, endHour }) => {
  const [page, setPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const filtered = messages.filter(m => {
    // Фильтрация по типу
    if (m.isError) {
      if (!filterTypes.includes('errors')) return false;
    } else {
      if (!filterTypes.includes(m.type.toString())) return false;
    }

    // Фильтрация по времени (если заданы startHour и endHour)
    if (startHour !== undefined && endHour !== undefined) {
      const date = new Date(m.timestamp);
      const hour = date.getHours();
      if (hour < startHour || hour > endHour) {
        return false;
      }
    }

    return true;
  });

  const sortedMessages = sortMessages(filtered);

  const pageCount = Math.max(1, Math.ceil(sortedMessages.length / PAGE_SIZE));
  const paginatedMessages = sortedMessages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-200 sticky top-0 z-10">
          <tr>
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
          {paginatedMessages.map((msg, idx) => {
            const isExpanded = expandedRows[msg.id.toString()];
            const shortBinary = msg.binaryData.slice(0, 50);

            return (
              <tr
                key={msg.id}
                className={`hover:bg-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                style={msg.isError ? errorRowStyle : undefined}
                title={msg.isError ? 'Ошибка' : ''}
              >
                <td className="border border-gray-300 p-2">{msg.id}</td>
                <td className="border border-gray-300 p-2">{new Date(msg.timestamp).toLocaleString()}</td>
                <td className="border border-gray-300 p-2 flex items-center gap-1">
                  <span>{msg.isError ? typeIcons['errors'] : typeIcons[msg.type]}</span>
                  <span>
                    {msg.isError
                      ? 'Ошибка'
                      : msg.type === '0'
                      ? 'Нейтральный'
                      : msg.type === '1'
                      ? 'Положительный'
                      : 'Отрицательный'}
                  </span>
                </td>
                <td className="border border-gray-300 p-2">{msg.taskNumber}</td>
                <td className="border border-gray-300 p-2">{msg.binaryData.length}</td>
                <td className="border border-gray-300 p-2">
                  <pre className="whitespace-pre-wrap break-all">
                    {isExpanded ? msg.binaryData : shortBinary}
                    {msg.binaryData.length > 50 && (
                      <button
                        onClick={() => toggleExpand(msg.id.toString())}
                        className="ml-2 text-blue-600 underline hover:text-blue-800"
                      >
                        {isExpanded ? 'Скрыть' : 'Показать всё'}
                      </button>
                    )}
                  </pre>
                </td>
                <td className="border border-gray-300 p-2">{msg.text}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-3 flex justify-center items-center gap-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Назад
        </button>
        <span>
          Страница {page} из {pageCount}
        </span>
        <button
          onClick={() => setPage(p => Math.min(pageCount, p + 1))}
          disabled={page === pageCount}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default MessageTable;
