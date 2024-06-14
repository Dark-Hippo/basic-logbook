import { LogBookType } from './context/LogbookContext';

export const logbookData: LogBookType[] = [
  {
    id: 1,
    name: 'Workout',
    records: [
      {
        id: 1,
        added: new Date('2024-06-11T08:00:00Z'),
        value: 100,
      },
      {
        id: 2,
        added: new Date('2024-06-12T08:00:00Z'),
        value: 200,
      },
      {
        id: 3,
        added: new Date('2024-06-12T09:00:00Z'),
        value: 300,
      },
      {
        id: 4,
        added: new Date('2024-06-13T11:30:00Z'),
        value: 300,
      },
      {
        id: 5,
        added: new Date('2024-06-14T09:00:00Z'),
        value: 300,
      },
    ],
  },
  {
    id: 2,
    name: 'Diet',
    records: [
      {
        id: 1,
        added: new Date('2024-06-11T08:00:00Z'),
        value: 2000,
      },
      {
        id: 2,
        added: new Date('2024-06-12T08:00:00Z'),
        value: 2500,
      },
      {
        id: 3,
        added: new Date('2024-06-13T09:00:00Z'),
        value: 3000,
      },
    ],
  },
];
