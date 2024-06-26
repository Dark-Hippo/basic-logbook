import { Link, useParams } from "react-router-dom";
import { LogBookType, useLogbook } from "../context/LogbookContext";
import { useState } from "react";
import { LogbookEntry } from "../components/LogbookEntry";
import { useRecords } from "../hooks/useRecords";
import { useFormatDate } from "../hooks/useFormatDate";

import './Logbook.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
    <div className="logbook">
      <h1>{logbook.name}</h1>
      <h2>{formatDate(new Date())} - {todayRecords.total}</h2>
      <div className="addEntry">
        <form onSubmit={submitHandler}>
          <input type="number" value={entry} onChange={e => setEntry(e.target.value)} />
          <button type="submit">
            <FontAwesomeIcon icon={faPlus} />
          </button>
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