import type { Message } from '../types';

function getRandomBinaryString(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.random() < 0.5 ? '0' : '1';
  }
  return result;
}

export const messages: Message[] = Array.from({ length: 5000 }, (_, i) => {
  const binaryLength = 10 + Math.floor(Math.random() * 41); // от 10 до 50 символов
  return {
    id: i + 1,
    type: String(Math.floor(Math.random() * 3)) as '0' | '1' | '2',
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isError: Math.random() < 0.05,
    taskNumber: 1000 + Math.floor(Math.random() * 9000),
    binaryData: getRandomBinaryString(binaryLength),
    text: `Сообщение #${i + 1}`,
  };
});
