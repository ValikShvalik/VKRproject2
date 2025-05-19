// src/data/messages.ts
import type { Message } from '../types';

export const messages: Message[] = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  type: String(Math.floor(Math.random() * 3)) as '0' | '1' | '2',
  timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
  isError: Math.random() < 0.05,
  text: `Сообщение #${i + 1}`, // добавлено поле text
}));
