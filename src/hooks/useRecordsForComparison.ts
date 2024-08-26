import { LogBookType } from '../context/LogbookContext';
import { LogbookRecordsByDateType } from '../types/LogbookRecordsByDateType';
import { RecordByDateType } from '../types/RecordsByDateType';
import { useFormatDate } from './useFormatDate';

export const useRecordsForComparison = (logbooks: LogBookType[]) => {
  const logbookRecordsByDate: LogbookRecordsByDateType[] = [
    ...logbooks.map((logbook) => {
      const { records } = logbook;
      const { formatDateForURL } = useFormatDate();
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
          groupedByDate.set(dateKey, {
            records: [record],
            total: record.value,
          });
        }
      });

      return {
        logbookId: logbook.id,
        logbookName: logbook.name,
        groupedByDate: groupedByDate,
      };
    }),
  ];

  return {
    logbookRecordsByDate,
  };
};
