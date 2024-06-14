import { useEffect, useState } from 'react';
import { LogBookRecordType } from '../context/LogbookContext';
import {
  RecordByDateType,
  RecordsByDateType,
} from '../types/RecordsByDateType';
import { useFormatDate } from './useFormatDate';
import { v4 as uuidv4 } from 'uuid';

/**
 * Custom hook that manages log book records.
 *
 * @param records - The array of log book records.
 * @returns An object containing today's records, previous records, and daily total.
 */
export const useRecords = (records: LogBookRecordType[]) => {
  const [todayRecords, setTodayRecords] = useState<RecordByDateType>({
    records: [],
    total: 0,
  });
  const [previousRecords, setPreviousRecords] = useState<RecordsByDateType>({});
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

    const today = formatDateForURL(new Date());

    // Filter out today's records from recordsByDate
    const previousRecordsByDate = Object.entries(recordsByDate).reduce(
      (acc, [date, records]) => {
        if (date !== today) {
          acc[date] = records;
        }
        return acc;
      },
      {} as RecordsByDateType
    );

    setTodayRecords(recordsByDate[today] || []);
    setPreviousRecords(previousRecordsByDate);
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

    setTodayRecords({
      records: [...todayRecords.records, record],
      total: todayRecords.total + record.value,
    });
  };

  const handleRemoveRecord = (id: string) => {
    const record = todayRecords.records.find((record) => record.id === id);
    if (!record) return;

    const updatedRecords = todayRecords.records.filter(
      (record) => record.id !== id
    );
    setTodayRecords({
      records: updatedRecords,
      total: todayRecords.total - record.value,
    });

    const index = records.findIndex((record) => record.id === id);
    if (index !== -1) {
      records.splice(index, 1);
    }
  };

  return {
    todayRecords,
    setTodayRecords,
    previousRecords,
    handleAddEntry,
    handleRemoveRecord,
  };
};
