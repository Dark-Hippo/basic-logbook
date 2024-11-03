import { LogBookType } from '../context/LogbookContext';
import { useFormatDate } from './useFormatDate';

interface GraphDataType {
  date: string;
  [key: string]: number | string;
}

export const useRecordsForCombinedComparison = (logbooks: LogBookType[]) => {
  const combined: GraphDataType[] = [];

  logbooks.forEach((logbook) => {
    const { records } = logbook;
    const { formatDateForURL } = useFormatDate();
    records.forEach((record) => {
      const dateKey = formatDateForURL(record.added);
      const existingEntry = combined.find((record) => record.date === dateKey);

      const value = record.value || 0;

      if (existingEntry) {
        existingEntry[logbook.id] = value;
      } else {
        combined.push({
          date: dateKey,
          [logbook.id]: record.value,
        });
      }
    });
  });

  // sort records by date descending
  combined.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return {
    combinedRecords: combined,
  };
};
