import { useEffect, useState } from 'react';
import { LogBookRecordType } from '../context/LogbookContext';
import { RecordsByDateType } from '../types/RecordsByDateType';
import { useFormatDate } from './useFormatDate';

/**
 * Custom hook that manages log book records.
 *
 * @param records - The array of log book records.
 * @returns An object containing today's records, previous records, and daily total.
 */
export const useRecords = (records: LogBookRecordType[]) => {
  const [dailyTotal, setDailyTotal] = useState(0);
  const [todayRecords, setTodayRecords] = useState<LogBookRecordType[]>([]);
  const [previousRecords, setPreviousRecords] = useState<RecordsByDateType>({});
  const formatDate = useFormatDate();

  useEffect(() => {
    // group logbook.records by date
    const recordsByDate: RecordsByDateType = records.reduce((acc, record) => {
      const date = formatDate(record.added);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(record);
      return acc;
    }, {} as RecordsByDateType);

    const today = formatDate(new Date());

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

  useEffect(() => {
    const total = todayRecords.reduce((acc, record) => acc + record.value, 0);
    setDailyTotal(total);
  }, [todayRecords]);

  return {
    todayRecords,
    setTodayRecords,
    previousRecords,
    dailyTotal,
  };
};
