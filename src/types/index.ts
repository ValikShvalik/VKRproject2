export type Message = {
  id: number;
  type: 0 | 1 | 2;
  text: string;
  timestamp: string;
  isError: boolean;
};
