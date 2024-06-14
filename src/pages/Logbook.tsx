import { useParams } from "react-router-dom";
import { LogBookRecordType, LogBookType, useLogbook } from "../context/LogbookContext";
import { useEffect, useState } from "react";
import { LogbookEntry } from "../components/LogbookEntry";
import { v4 as uuidv4 } from 'uuid';
import { useRecords } from "../hooks/useRecords";
import { useFormatDate } from "../hooks/useFormatDate";

export const Logbook = () => {
  const { logbooks } = useLogbook();
  const { logbookId } = useParams<{ logbookId: string }>();

  const id = Number(logbookId)

  const logbook: LogBookType | undefined = logbooks.find((logbook) => logbook.id === id);

  const [entry, setEntry] = useState("");
  const formatDate = useFormatDate();

  if (!logbook) {
    return <div>Logbook not found</div>
  }

  const { todayRecords, setTodayRecords, previousRecords, dailyTotal } = useRecords(logbook.records);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddEntry();
  }

  const handleAddEntry = () => {
    if (!entry) return;
    if (isNaN(Number(entry))) return;
    if (Number(entry) < 0) return;

    const record: LogBookRecordType = {
      id: uuidv4(),
      added: new Date(),
      value: Number(entry)
    }

    // logbook.records = [...records, record];
    setTodayRecords([...todayRecords, record]);

    setEntry("");
  }

  const onDelete = (id: string) => {
    // delete from logbook.records where id === id
    const updatedRecords = todayRecords.filter(record => record.id !== id);
    setTodayRecords(updatedRecords);
    logbook.records = updatedRecords;
  }

  return (
    <div>
      <h1>Logbook {logbook.name}</h1>
      <h2>{formatDate(new Date())} -Total for today {dailyTotal}</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="number" value={entry} onChange={e => setEntry(e.target.value)} />
          <button type="submit">Add entry</button>
        </form>
      </div>
      <ul>
        {todayRecords.map((record) => (
          <LogbookEntry record={record} onDelete={onDelete} key={record.id} />
        ))}
      </ul>
    </div>
  )
}