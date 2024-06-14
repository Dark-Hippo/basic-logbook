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

  const { todayRecords, setTodayRecords, previousRecords } = useRecords(logbook.records);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddEntry();
  }

  const handleAddEntry = () => {
    if (!entry) return;
    if (isNaN(Number(entry))) return;
    if (Number(entry) < 0) return;

    // TODO: Move this to own class to handle uuid in constructor
    const record: LogBookRecordType = {
      id: uuidv4(),
      added: new Date(),
      value: Number(entry)
    }

    logbook.records.push(record);

    setTodayRecords({
      records: [...todayRecords.records, record],
      total: todayRecords.total + record.value
    });

    setEntry("");
  }

  const onDelete = (id: string) => {
    // delete from logbook.records where id === id
    const record = todayRecords.records.find(record => record.id === id);
    if (!record) return;
    const updatedRecords = todayRecords.records.filter(record => record.id !== id);
    setTodayRecords({
      records: updatedRecords,
      total: todayRecords.total - record.value
    });
    logbook.records = updatedRecords;
  }

  return (
    <div>
      <h1>Logbook {logbook.name}</h1>
      <h2>{formatDate(new Date())} -Total for today {todayRecords.total}</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="number" value={entry} onChange={e => setEntry(e.target.value)} />
          <button type="submit">Add entry</button>
        </form>
      </div>
      <ul>
        {todayRecords.records.map((record) => (
          <LogbookEntry record={record} onDelete={onDelete} key={record.id} />
        ))}
      </ul>
      <ul>
        {Object.entries(previousRecords).map(([date, recordByDate]) => (
          <li key={date}>
            <h3>{date}</h3>
            <ul>
              {recordByDate.records.map((record) => (
                <LogbookEntry record={record} onDelete={onDelete} key={record.id} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}