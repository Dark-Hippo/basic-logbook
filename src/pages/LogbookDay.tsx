import { useParams } from "react-router-dom";
import { LogBookType, useLogbook } from "../context/LogbookContext";
import { useEffect, useState } from "react";
import { LogbookEntry } from "../components/LogbookEntry";
import { useFormatDate } from "../hooks/useFormatDate";
import { RecordByDateType } from "../types/RecordsByDateType";

export const LogbookDay = () => {
  const { logbooks } = useLogbook();
  const { logbookId, date } = useParams<{ logbookId: string, date: string }>();

  const id = Number(logbookId)

  const logbook: LogBookType | undefined = logbooks.find((logbook) => logbook.id === id);

  const [entry, setEntry] = useState("");
  const { formatDate } = useFormatDate();

  const [recordByDate, setRecordByDate] = useState<RecordByDateType>({ records: [], total: 0 });

  if (!logbook || !date) {
    return <div>Logbook not found</div>
  }

  const recordsDate = new Date(date);

  useEffect(() => {
    const records = logbook.records.filter((record) => {
      return formatDate(record.added) === formatDate(recordsDate);
    });

    const total = records.reduce((acc, record) => acc + record.value, 0);

    setRecordByDate({
      records,
      total,
    });
  }, [logbook.records, date]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submitHandler', entry)
    setEntry("");
  }

  const deleteHandler = (id: string) => {
    console.log('deleteHandler', id)
  }

  return (
    <div>
      <h1>Logbook {logbook.name}</h1>
      <h2>{formatDate(recordsDate)} - Total: {recordByDate.total}</h2>
      <div>
        <form onSubmit={submitHandler}>
          <input type="number" value={entry} onChange={e => setEntry(e.target.value)} />
          <button type="submit">Add entry</button>
        </form>
      </div>
      <ul>
        {recordByDate.records.map((record) => (
          <LogbookEntry record={record} onDelete={deleteHandler} key={record.id} />
        ))}
      </ul>
    </div>
  )
}