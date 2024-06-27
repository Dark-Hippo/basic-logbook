import { useEffect, useState } from 'react';
import { LogBookRecordType } from '../context/LogbookContext';
import { RecordsByDateType } from '../types/RecordsByDateType';
import { useFormatDate } from './useFormatDate';
import { v4 as uuidv4 } from 'uuid';

/**
 * Custom hook that manages log book records.
 *
 * @param records - The array of log book records.
 * @returns An object containing today's records, previous records, and daily total.
 */
export const useRecords = (records: LogBookRecordType[]) => {
  const [recordsByDate, setRecordsByDate] = useState<RecordsByDateType>({});
  const { formatDateForURL } = useFormatDate();

  useEffect(() => {
    // group logbook.records by date
    const recordsByDate: RecordsByDateType = records.reduce((acc, record) => {
      const date = formatDateForURL(record.added);
      if (!acc[date]) {
        acc[date] = { records: [], total: 0 };
      }
      acc[date].total += record.value;
      acc[date].records.push(record);
      return acc;
    }, {} as RecordsByDateType);

    setRecordsByDate(recordsByDate);
  }, [records]);

  const handleAddEntry = (entry: string) => {
    if (!entry) return;
    if (isNaN(Number(entry))) return;
    if (Number(entry) < 0) return;

    // TODO: Move this to own class to handle uuid in constructor
    const record: LogBookRecordType = {
      id: uuidv4(),
      added: new Date(),
      value: Number(entry),
    };

    records.push(record);

    setRecordsByDate({
      ...recordsByDate,
      [formatDateForURL(record.added)]: {
        records: [
          ...recordsByDate[formatDateForURL(record.added)].records,
          record,
        ],
        total:
          recordsByDate[formatDateForURL(record.added)].total + record.value,
      },
    });
  };

  return {
    recordsByDate,
    handleAddEntry,
  };
};
