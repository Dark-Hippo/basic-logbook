import { ReactNode, createContext, useContext, useState } from "react";
import { logbookData } from "../testData";

export type LogBookRecordType = {
  id: string;
  added: Date;
  value: number;
}

export type LogBookType = {
  id: number;
  name: string;
  records: LogBookRecordType[];
};

type LogbookContextType = {
  logbooks: LogBookType[];
  addLogbook: (name: string) => void;
};

const LogbookContext = createContext<LogbookContextType>({
  logbooks: [] = logbookData,
  addLogbook: () => { },
});

type LogbookProviderProps = {
  children: ReactNode;
  initialLogbooks?: LogBookType[];
};

export const LogbookProvider = ({ children, initialLogbooks }: LogbookProviderProps) => {
  const [logbooks, setLogbooks] = useState<LogBookType[]>(initialLogbooks || []);

  const addLogbook = (name: string) => {
    setLogbooks((prevLogbooks) => [
      ...prevLogbooks,
      {
        id: prevLogbooks.length + 1,
        name,
        records: [],
      },
    ]);
  };

  return (
    <LogbookContext.Provider value={{ logbooks, addLogbook }}>
      {children}
    </LogbookContext.Provider>
  );
}

export const useLogbook = () => {
  return useContext(LogbookContext);
}