export interface Message {
  id: number;
  type: '0' | '1' | '2' | 'errors';
  timestamp: string;
  isError: boolean;
  taskNumber: number;
  binaryData: string;
  text: string;
}


export type ChartType = 'pie' | 'bar' | 'line';