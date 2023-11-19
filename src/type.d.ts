export interface LogData {
  list: string[];
  valid: Valid[];
}

interface Valid {
  name: string;
  total: number;
  lastUpdate: Date;
}

export const initLogData: LogData = {
  list: [],
  valid: [],
};
