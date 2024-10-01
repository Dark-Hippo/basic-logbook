import { useLocation } from "react-router-dom";
import { useLogbook } from "../context/LogbookContext";
import { useEffect, useState } from "react";
import { useRecordsForComparison } from "../hooks/useRecordsForComparison";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useRecordsForCombinedComparison } from "../hooks/useRecordsForCombinedComparison";

export const Compare = () => {
  const location = useLocation();
  const selectedIds = location.state?.selectedIds as number[] || [];

  const { logbooks } = useLogbook();
  const [selectedLogbooks, setSelectedLogbooks] = useState(logbooks.filter(logbook => selectedIds.includes(logbook.id)));

  const { logbookRecordsByDate } = useRecordsForComparison(selectedLogbooks);
  const { combinedRecords } = useRecordsForCombinedComparison(selectedLogbooks);

  console.log('combinedRecords', combinedRecords);

  const comparisonTitle = selectedLogbooks.map(logbook => logbook.name).join(' vs ');

  return (
    <div className="logbookCompare">
      <h1>Compare {comparisonTitle}</h1>
      <div className="chart">
        {/* Render a chart comparing the values of the selected logbooks */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={combinedRecords}>
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" yAxisId="left" dataKey="1" stroke="#8884d8" />
            <YAxis yAxisId="left" width={30} />
            <XAxis dataKey="date" />
            <YAxis yAxisId="right" orientation="right" width={30} />
            <Line type="monotone" yAxisId="right" dataKey="2" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}