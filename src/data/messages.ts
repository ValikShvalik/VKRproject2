import type { Message } from '../types';

export const messages: Message[] = [
  { id: 1, type: 0, text: 'Сообщение типа 0', timestamp: '2025-05-18T10:00:00', isError: false },
  { id: 2, type: 1, text: 'Сообщение типа 1', timestamp: '2025-05-18T10:01:00', isError: true },
  { id: 3, type: 2, text: 'Сообщение типа 2', timestamp: '2025-05-18T10:02:00', isError: false },
  { id: 4, type: 1, text: 'Сообщение типа 1', timestamp: '2025-05-18T10:03:00', isError: false },
  { id: 5, type: 0, text: 'Сообщение типа 0', timestamp: '2025-05-18T10:04:00', isError: true },
  { id: 6, type: 2, text: 'Сообщение типа 2', timestamp: '2025-05-18T10:05:00', isError: false },
];

