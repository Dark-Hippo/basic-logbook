import { LogBookType } from './context/LogbookContext';
import { v4 as uuidv4 } from 'uuid';

export const logbookData: LogBookType[] = [
  {
    id: 1,
    name: 'Workout',
    records: [
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
        added: new Date('2024-06-13T11:30:00Z'),
        value: 300,
      },
      {
        id: uuidv4(),
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
