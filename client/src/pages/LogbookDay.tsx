import { useParams } from "react-router-dom";
import { LogBookRecordType, LogBookType, useLogbook } from "../context/LogbookContext";
import { useEffect, useState } from "react";
import { LogbookEntry } from "../components/LogbookEntry";
import { useFormatDate } from "../hooks/useFormatDate";
import { RecordByDateType } from "../types/RecordsByDateType";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import './Logbook.css'

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

    if (!entry) return;
    if (isNaN(Number(entry))) return;
    if (Number(entry) < 0) return;

    const record: LogBookRecordType = {
      id: uuidv4(),
      added: recordsDate,
      value: Number(entry),
    };

    logbook.records = [...logbook.records, record];

    setRecordByDate({
      records: [...recordByDate.records],
      total: recordByDate.total + record.value,
    });

    setEntry("");
  }

  const deleteHandler = (id: string) => {

    logbook.records = logbook.records.filter((record) => record.id !== id);

    const record = recordByDate.records.find((record) => record.id === id);
    if (!record) return;

    setRecordByDate({
      records: recordByDate.records.filter((record) => record.id !== id),
      total: recordByDate.total - record.value,
    });
  }

  return (
    <div className="logbook">
      <h1>{logbook.name}</h1>
      <h2>{formatDate(recordsDate)}</h2>
      <div className="logbookEntryTotalContainer">
        <div className="addEntry">
          <form onSubmit={submitHandler}>
            <input type="number" value={entry} onChange={e => setEntry(e.target.value)} />
            <button type="submit">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </form>
        </div>
        <div className="total">
          Current total:
          <span className="totalText">{recordByDate.total}</span>
        </div>
      </div>
      <ul className="logbookEntries">
        {recordByDate.records.map((record) => (
          <LogbookEntry record={record} onDelete={deleteHandler} key={record.id} />
        ))}
      </ul>
    </div>
  )
}