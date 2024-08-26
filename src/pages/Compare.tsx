import { useLocation } from "react-router-dom";
import { useLogbook } from "../context/LogbookContext";
import { useEffect, useState } from "react";
import { useRecordsForComparison } from "../hooks/useRecordsForComparison";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, YAxis } from "recharts";
import { LogbookRecordsByDateType } from "../types/LogbookRecordsByDateType";

export const Compare = () => {
  const location = useLocation();
  const selectedIds = location.state?.selectedIds as number[] || [];

  const { logbooks } = useLogbook();
  const [selectedLogbooks, setSelectedLogbooks] = useState(logbooks.filter(logbook => selectedIds.includes(logbook.id)));

  const { logbookRecordsByDate } = useRecordsForComparison(selectedLogbooks);

  const comparisonTitle = selectedLogbooks.map(logbook => logbook.name).join(' vs ');

  type GraphDataType =
    {
      date: string,
      total: number
    }

  const [graphData, setGraphData] = useState<GraphDataType[]>([]);

  useEffect(() => {
    console.log(logbookRecordsByDate);
    const recs = [...logbookRecordsByDate[0].groupedByDate.entries()]
      .map(([date, data]) => {
        return {
          date,
          total: data.total
        }
      });
    setGraphData(recs);
    console.log(graphData);
    // const graphData: GraphDataType[][] = logbookRecordsByDate.map((records: LogbookRecordsByDateType) => {
    //   return [...records.groupedByDate.entries()]
    //     .map(([date, data]) => {
    //       return {
    //         date,
    //         total: data.total
    //       }
    //     });
    // });
    // setGraphData(graphData);
  }, []);

  return (
    <div className="logbookCompare">
      <h1>Compare {comparisonTitle}</h1>
      <div className="chart">
        {/* Render a chart comparing the values of the selected logbooks */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={graphData}>
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" yAxisId="left" dataKey="total" stroke="#8884d8" />
            <YAxis yAxisId="left" width={30} />

          </LineChart>

          {/* <LineChart data={logbookRecordsByDate}>
            {selectedLogbooks.map((logbook, index) => (
              <Line
                key={logbook.id}
                type="monotone"
                dataKey={`logbook-${logbook.id}`}
                stroke={`#${index + 1}000`}
              />
            ))}
          </LineChart> */}
        </ResponsiveContainer>
      </div>
    </div>
  )
}