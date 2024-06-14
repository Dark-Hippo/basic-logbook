import { useParams } from "react-router-dom";
import { LogBookRecordType, LogBookType, useLogbook } from "../context/LogbookContext";
import { useEffect, useState } from "react";
import { LogbookEntry } from "../components/LogbookEntry";
import { v4 as uuidv4 } from 'uuid';

export const Logbook = () => {
  const { logbooks } = useLogbook();
  const { logbookId } = useParams<{ logbookId: string }>();

  const id = Number(logbookId)

  const logbook: LogBookType | undefined = logbooks.find((logbook) => logbook.id === id);

  const [entry, setEntry] = useState("");
  const [dailyTotal, setDailyTotal] = useState(0);
  const [records, setRecords] = useState<LogBookRecordType[]>([]);

  if (!logbook) {
    return <div>Logbook not found</div>
  }

  type RecordsByDateType = { [key: string]: LogBookRecordType[] };

  useEffect(() => {
    // group logbook.records by date
    const recordsByDate: RecordsByDateType = logbook.records.reduce((acc, record) => {
      const date = formatDate(record.added);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(record);
      return acc;
    }, {} as RecordsByDateType);

    const today = formatDate(new Date());
    setRecords(recordsByDate[today] || []);
  }, [logbook.records]);

  useEffect(() => {
    const total = records.reduce((acc, record) => acc + record.value, 0);
    setDailyTotal(total);
  }, [records]);

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
    setRecords([...records, record]);

    setEntry("");
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '-');
  }

  const onDelete = (id: string) => {
    // delete from logbook.records where id === id
    const updatedRecords = records.filter(record => record.id !== id);
    setRecords(updatedRecords);
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
        {records.map((record) => (
          <LogbookEntry record={record} onDelete={onDelete} key={record.id} />
        ))}
      </ul>
    </div>
  )
}