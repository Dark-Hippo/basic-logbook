import { Link, useParams } from "react-router-dom";
import { LogBookType, useLogbook } from "../context/LogbookContext";
import { useState } from "react";
import { LogbookEntry } from "../components/LogbookEntry";
import { useRecords } from "../hooks/useRecords";
import { useFormatDate } from "../hooks/useFormatDate";

export const Logbook = () => {
  const { logbooks } = useLogbook();
  const { logbookId } = useParams<{ logbookId: string }>();

  const id = Number(logbookId)

  const logbook: LogBookType | undefined = logbooks.find((logbook) => logbook.id === id);

  const [entry, setEntry] = useState("");
  const { formatDate } = useFormatDate();

  if (!logbook) {
    return <div>Logbook not found</div>
  }

  const {
    todayRecords,
    previousRecords,
    handleAddEntry,
    handleRemoveRecord,
  } = useRecords(logbook.records);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddEntry(entry);
    setEntry("");
  }

  const deleteHandler = (id: string) => {
    handleRemoveRecord(id);
  }

  return (
    <div>
      <h1>Logbook {logbook.name}</h1>
      <h2>{formatDate(new Date())} -Total for today {todayRecords.total}</h2>
      <div>
        <form onSubmit={submitHandler}>
          <input type="number" value={entry} onChange={e => setEntry(e.target.value)} />
          <button type="submit">Add entry</button>
        </form>
      </div>
      <ul>
        {todayRecords.records.map((record) => (
          <LogbookEntry record={record} onDelete={deleteHandler} key={record.id} />
        ))}
      </ul>
      <ul>
        {Object.entries(previousRecords).map(([date, recordByDate]) => (
          <li key={date}>
            <Link to={`/logbook/${logbook.id}/${date}`}>{date} - Total {recordByDate.total}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}