import type { Message } from '../types';

export const messages: Message[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    type: 1,
    taskId: 101,
    binaryData: '1010101',
    text: 'Сообщение положительное',
    isError: false,
  },
  {
    id: '2',
    timestamp: new Date(new Date().setHours(9, 30)).toISOString(),
    type: 2,
    taskId: 102,
    binaryData: '111000',
    text: 'Сообщение отрицательное',
    isError: false,
  },
  {
    id: '3',
    timestamp: new Date(new Date().setHours(18, 45)).toISOString(),
    type: 0,
    taskId: 103,
    binaryData: '000111',
    text: 'Сообщение нейтральное',
    isError: true,
  },
  // ...добавьте больше для теста
];
