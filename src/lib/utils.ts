import type { Message } from "@/data/messages";


export function parseMessageType(text: string): number {
  if (text.toLowerCase().includes("ошибка") || text.toLowerCase().includes("сбой")) {
    return 2; // Отрицательный тип
  } else if (text.toLowerCase().includes("подключение") || text.toLowerCase().includes("стабилен")) {
    return 1; // Положительный тип
  }
  return 0; // Нейтральный тип
}

export function isErrorMessage(text: string): boolean {
  return text.toLowerCase().includes("ошибка") || text.toLowerCase().includes("сбой");
}

export function detectSignalEvents(messages: Message[]): { connectedIds: number[]; disconnectedIds: number[] } {
  const connectedIds = messages.filter(m => m.text.toLowerCase().includes("подключение")).map(m => m.id);
  const disconnectedIds = messages.filter(m => m.text.toLowerCase().includes("отключение")).map(m => m.id);
  return { connectedIds, disconnectedIds };
}
