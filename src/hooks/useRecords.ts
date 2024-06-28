import { useEffect, useState } from 'react';
import { LogBookRecordType } from '../context/LogbookContext';
import { RecordsByDateType } from '../types/RecordsByDateType';
import { useFormatDate } from './useFormatDate';
import LogbookRecord from '../LogbookRecord';

/**
 * Custom hook that manages log book records.
 *
 * @param records - The array of log book records.
 * @returns An object containing today's records, previous records, and daily total.
 */
export const useRecords = (records: LogBookRecordType[]) => {
  const [recordsByDate, setRecordsByDate] = useState<RecordsByDateType>({});
  const { formatDateForURL } = useFormatDate();

  const sortRecords = (records: RecordsByDateType): RecordsByDateType => {
    // Step 1: Convert to array
    const sortedEntries = Object.entries(records)
      // Step 2: Sort the array
      .sort(([date1], [date2]) => date2.localeCompare(date1));

    // Optional Step 3: Convert back to object if necessary
    const sortedRecordsByDate = sortedEntries.reduce((acc, [date, data]) => {
      acc[date] = data;
      return acc;
    }, {} as RecordsByDateType);

    return sortedRecordsByDate;
  };

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

    // Step 1: Convert to array
    const sortedEntries = sortRecords(recordsByDate);

    setRecordsByDate(sortedEntries);
  }, [records]);

  const handleAddEntry = (entry: string) => {
    if (!entry) return;
    if (isNaN(Number(entry))) return;
    if (Number(entry) < 0) return;

    const record = new LogbookRecord(new Date(), Number(entry));

    const newDateAdded: boolean = Object.keys(recordsByDate).includes(
      formatDateForURL(record.added)
    );

    records.push(record);

    const newRecordsByDate = {
      ...recordsByDate,
      [formatDateForURL(record.added)]: {
        records: [
          ...(recordsByDate[formatDateForURL(record.added)]?.records || []),
          record,
        ],
        total:
          (recordsByDate[formatDateForURL(record.added)]?.total || 0) +
          record.value,
      },
    };

    if (newDateAdded) {
      setRecordsByDate(sortRecords(newRecordsByDate));
    } else {
      setRecordsByDate(newRecordsByDate);
    }
    console.log(newRecordsByDate);
    console.log('sorted', sortRecords(newRecordsByDate));
  };

  return {
    recordsByDate,
    handleAddEntry,
  };
};
