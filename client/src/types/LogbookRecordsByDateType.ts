import { RecordByDateType } from './RecordsByDateType';

export type LogbookRecordsByDateType = {
  logbookId: number;
  logbookName: string;
  groupedByDate: Map<string, RecordByDateType>;
};
