import { useState } from 'react';

type Log = {
  id: number;
  name: string;
};

export const useLogBooks = () => {
  let initialLogbooks: Log[] = [
    { id: 1, name: 'Logbook 1' },
    { id: 2, name: 'Logbook 2' },
    { id: 3, name: 'Logbook 3' },
  ];
  const [logbooks, setLogbooks] = useState<Log[]>(initialLogbooks);

  return { logbooks, setLogbooks };
  // const getLogbooks = (): Log[] => logbooks;

  // const addLogbook = (name: string): Log => {
  //   const id = logbooks.length + 1;
  //   const log = { id, name };
  //   setLogbooks([...logbooks, log]);

  //   return log;
  // };

  // const deleteLogbook = (id: number): void => {
  //   setLogbooks(logbooks.filter((logbook) => logbook.id !== id));
  // };

  // const getLogbook = (id: number): Log | undefined =>
  //   logbooks.find((logbook) => logbook.id === id);

  // return { getLogbooks, addLogbook, deleteLogbook, getLogbook };
};
