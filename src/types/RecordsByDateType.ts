import { LogBookRecordType } from '../context/LogbookContext';

export type RecordByDateType = {
  records: LogBookRecordType[];
  total: number;
};

export type RecordsByDateType = Map<string, RecordByDateType>;
