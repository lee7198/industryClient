export interface LogData {
  list: string[];
  valid: Valid[];
  fpsCounter: {
    count: number[];
    last: number;
  };
}

interface Valid {
  name: string;
  total: number;
  lastUpdate: Date;
}
