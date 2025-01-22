import { useEffect, useState } from 'react';
import { LogBookRecordType } from '../context/LogbookContext';
import {
  RecordByDateType,
  RecordsByDateType,
} from '../types/RecordsByDateType';
import { useFormatDate } from './useFormatDate';
import LogbookRecord from '../LogbookRecord';

/**
 * Custom hook that manages log book records.
 *
 * @param records - The array of log book records.
 * @returns An object containing today's records, previous records, and daily total.
 */
export const useRecords = (records: LogBookRecordType[]) => {
  const [recordsByDate, setRecordsByDate] = useState<RecordsByDateType>();
  const { formatDateForURL } = useFormatDate();

  useEffect(() => {
    // Assuming records is an array of LogbookRecord objects
    // and formatDateForURL formats the date as a string key
    const groupedByDate = new Map<string, RecordByDateType>();

    records.forEach((record) => {
      const dateKey = formatDateForURL(record.added); // Format the date to use as a key
      const existingEntry = groupedByDate.get(dateKey);

      if (existingEntry) {
        // If the date already exists in the map, append the record to the records array
        existingEntry.records.push(record);
        existingEntry.total += record.value; // Assuming each record has a 'value' to sum up
      } else {
        // If the date does not exist, create a new entry in the map
        groupedByDate.set(dateKey, { records: [record], total: record.value });
      }
    });

    setRecordsByDate(groupedByDate);
    // Now groupedByDate is a Map with dates as keys and RecordByDateType objects as values
    // You can update your state or perform other actions with groupedByDate here
  }, [records]);

  const handleAddEntry = (entry: string) => {
    if (!entry) return;
    if (isNaN(Number(entry))) return;
    if (Number(entry) < 0) return;

    const record = new LogbookRecord(new Date(), Number(entry));

    records.push(record);

    setRecordsByDate((prevRecordsByDate) => {
      const dateKey = formatDateForURL(record.added);

      const existingEntry = prevRecordsByDate?.get(dateKey);

      if (existingEntry) {
        return new Map(prevRecordsByDate).set(dateKey, {
          records: [...existingEntry.records, record],
          total: existingEntry.total + record.value,
        });
      }

      return new Map(prevRecordsByDate).set(dateKey, {
        records: [record],
        total: record.value,
      });
    });
  };

  return {
    recordsByDate,
    handleAddEntry,
  };
};
