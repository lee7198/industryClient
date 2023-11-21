import { LogData } from './type';

export const models = ['cars57', 'cars57_nobg', 'cars131'];

export const initLogData: LogData = {
  list: [],
  valid: [],
  fpsCounter: { count: [0, 0], last: Date.now() },
};
