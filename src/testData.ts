import LogbookRecord from './LogbookRecord';
import { LogBookType } from './context/LogbookContext';
import { v4 as uuidv4 } from 'uuid';

export const logbookData: LogBookType[] = [
  {
    id: 1,
    name: 'Workout',
    records: [
      new LogbookRecord(new Date('2024-06-11T08:00:00Z'), 199),
      {
        id: uuidv4(),
        added: new Date('2024-06-20T08:00:00Z'),
        value: 100,
      },
      {
        id: uuidv4(),
        added: new Date('2024-06-11T08:00:00Z'),
        value: 100,
      },
      {
        id: uuidv4(),
        added: new Date('2024-06-12T08:00:00Z'),
        value: 200,
      },
      {
        id: uuidv4(),
        added: new Date('2024-06-12T09:00:00Z'),
        value: 300,
      },
      {
        id: uuidv4(),
        added: new Date('2024-06-11T11:30:00Z'),
        value: 300,
      },
      {
        id: uuidv4(),
        added: new Date('2024-06-14T09:00:00Z'),
        value: 300,
      },
      {
        id: uuidv4(),
        added: new Date('2024-06-26T09:00:00Z'),
        value: 300,
      },
      {
        id: uuidv4(),
        added: new Date('2024-06-27T09:00:00Z'),
        value: 250,
      },
    ],
  },
  {
    id: 2,
    name: 'Diet',
    records: [
      {
        id: uuidv4(),
        added: new Date('2024-06-11T08:00:00Z'),
        value: 2000,
      },
      {
        id: uuidv4(),
        added: new Date('2024-06-12T08:00:00Z'),
        value: 2500,
      },
      {
        id: uuidv4(),
        added: new Date('2024-06-13T09:00:00Z'),
        value: 3000,
      },
    ],
  },
];

// function to generate test data, takes in a start and end date, min and max number of records to generate for each date and min and max values for each record
export const generateTestData = (
  logbookName: string,
  startDate: Date,
  endDate: Date,
  minRecords: number,
  maxRecords: number,
  minValue: number,
  maxValue: number
): LogBookType[] => {
  const dateDiff = endDate.getTime() - startDate.getTime();
  const dateDiffDays = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));

  const logbookRecords: LogbookRecord[] = [];

  for (let i = 0; i < dateDiffDays; i++) {
    const date = new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24));

    const numRecords =
      Math.floor(Math.random() * (maxRecords - minRecords + 1)) + minRecords;

    const records = Array.from({ length: numRecords }, () => {
      const value =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

      return new LogbookRecord(date, value);
    });

    logbookRecords.push(...records);
  }

  const logbook: LogBookType = {
    id: 1,
    name: logbookName,
    records: logbookRecords,
  };

  return [logbook];
};

// calculate date for 30 days ago
const date30DaysAgo = new Date();
date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);

// generate test data for the last 30 days with 1-5 records per day and values between 30 and 100
export const testData = generateTestData(
  'Protein Intake',
  date30DaysAgo,
  new Date(),
  1,
  5,
  30,
  100
);
