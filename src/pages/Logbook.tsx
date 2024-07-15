import { useParams } from "react-router-dom";
import { LogBookType, useLogbook } from "../context/LogbookContext";
import { useEffect, useState } from "react";
import { useRecords } from "../hooks/useRecords";
import { useFormatDate } from "../hooks/useFormatDate";

import './Logbook.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { LogbookPreviousRecord } from "../components/LogbookPreviousRecord";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Logbook = () => {
  const { logbooks } = useLogbook();
  const { logbookId } = useParams<{ logbookId: string }>();

  const id = Number(logbookId)

  const logbook: LogBookType | undefined = logbooks.find((logbook) => logbook.id === id);

  const [entry, setEntry] = useState("");
  const { formatDate } = useFormatDate();
  const [graphData, setGraphData] = useState<{ date: string, total: number }[]>();

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

  useEffect(() => {
    if (!recordsByDate) return;
    const graphData = [...recordsByDate.entries()]
      .sort(([date1], [date2]) => date1.localeCompare(date2))
      .map(([date, data]) => {
        return { date, data }
      });

    setGraphData(
      graphData.map(({ date, data }) => ({
        date,
        total: data.total
      })
      ));

  }, [recordsByDate]);

  return (
    <div className="logbook">
      <h1>{logbook.name}</h1>
      <h2>{formatDate(new Date())}</h2>
      <div className="chart">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={graphData}>
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" interval="preserveStartEnd" tickSize={10} tickFormatter={(value) => { return formatDate(new Date(value)) }} />
            <YAxis width={30} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
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