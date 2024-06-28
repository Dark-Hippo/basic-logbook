import { useParams } from "react-router-dom";
import { LogBookType, useLogbook } from "../context/LogbookContext";
import { useState } from "react";
import { useRecords } from "../hooks/useRecords";
import { useFormatDate } from "../hooks/useFormatDate";

import './Logbook.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { LogbookPreviousRecord } from "../components/LogbookPreviousRecord";

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
    recordsByDate,
    handleAddEntry,
  } = useRecords(logbook.records);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddEntry(entry);
    setEntry("");
  }

  return (
    <div className="logbook">
      <h1>{logbook.name}</h1>
      <h2>{formatDate(new Date())}</h2>
      <div className="logbookEntryTotalContainer">
        <div className="addEntry">
          <form onSubmit={submitHandler}>
            <input type="number" value={entry} onChange={e => setEntry(e.target.value)} />
            <button type="submit">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </form>
        </div>
      </div>
      {recordsByDate && (
        <ul className="no-icon" style={{ paddingTop: '20px' }}>
          {[...recordsByDate.entries()]
            .sort(([date1], [date2]) => date2.localeCompare(date1))
            .map(([date, data]) => (
              <LogbookPreviousRecord key={date} logbookId={logbook.id} date={date} recordByDate={data} />
            ))}
        </ul>
      )}
    </div>
  )
}