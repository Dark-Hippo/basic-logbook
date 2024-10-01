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

  return {
    combinedRecords: combined,
  };
};

/**
 * The above won't work for this chart library.
 * The format should be along the lines of this:
 * [
 *  {
 *    date: '2024-06-11',
 *    protein: 100,
 *    waist: 36,
 * },
 * {
 *    date: '2024-06-12',
 *    protein: 150,
 *    waist: 36,
 *  },
 * ]
 * see https://recharts.org/en-US/examples/BiaxialLineChart
 * and https://recharts.org/en-US/examples/LineChartHasMultiSeries
 */
