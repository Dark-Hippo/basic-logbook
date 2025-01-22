import { useLocation } from "react-router-dom";
import { useLogbook } from "../context/LogbookContext";
import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useRecordsForCombinedComparison } from "../hooks/useRecordsForCombinedComparison";

export const Compare = () => {
  const location = useLocation();
  const selectedIds = location.state?.selectedIds as number[] || [];

  const { logbooks } = useLogbook();
  const [selectedLogbooks, setSelectedLogbooks] = useState(logbooks.filter(logbook => selectedIds.includes(logbook.id)));

  const [showLegend, setShowLegend] = useState(true);
  const [showDataPoints, setShowDataPoints] = useState(false);

  const { combinedRecords } = useRecordsForCombinedComparison(selectedLogbooks);

  const comparisonTitle = selectedLogbooks.map(logbook => logbook.name).join(' vs ');

  return (
    <div className="logbookCompare">
      <h1>Compare {comparisonTitle}</h1>
      <div className="chart">
        {/* Render a chart comparing the values of the selected logbooks */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={500}
            height={300}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            data={combinedRecords}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" width={30} />
            <YAxis yAxisId="right" orientation="right" width={30} />
            <Tooltip />
            {showLegend && <Legend />}
            <Line type="monotone" yAxisId="left" dataKey="1" stroke="#8884d8" connectNulls={true} dot={showDataPoints} />
            <Line type="monotone" yAxisId="right" dataKey="2" stroke="#82ca9d" connectNulls={true} dot={showDataPoints} />
          </LineChart>
        </ResponsiveContainer>
        <div className="optionsContainer">
          <input type="checkbox" name="show_legend" id="show_legend" checked={showLegend} onChange={() => setShowLegend(!showLegend)} /><label htmlFor="show_legend">Show Legend</label>
          <input type="checkbox" name="show_data_points" id="show_data_points" checked={showDataPoints} onChange={() => setShowDataPoints(!showDataPoints)} /><label htmlFor="show_data_points">Show Data Points</label>
        </div>
      </div>
    </div>
  )
}