export interface Message {
  id: number;
  type: number; // 0 - нейтральный, 1 - положительный, 2 - отрицательный
  text: string;
  timestamp: string; // строка с датой/временем
}

export const messages: Message[] = [
  { id: 1, type: 0, text: "Система запущена", timestamp: "2025-05-16T10:00:00Z" },
  { id: 2, type: 1, text: "Подключение сигнала установлено", timestamp: "2025-05-16T10:01:00Z" },
  { id: 3, type: 2, text: "Ошибка связи с модулем", timestamp: "2025-05-16T10:05:00Z" },
  { id: 4, type: 1, text: "Сигнал стабилен", timestamp: "2025-05-16T10:10:00Z" },
  { id: 5, type: 0, text: "Ожидание данных", timestamp: "2025-05-16T10:15:00Z" },
  // ...добавьте еще по желанию
];
