import { useLocation } from "react-router-dom";
import { useLogbook } from "../context/LogbookContext";
import { useEffect } from "react";

export const Compare = () => {
  const location = useLocation();
  const selectedIds = location.state?.selectedIds as number[] || [];

  const { logbooks } = useLogbook();
  const selectedLogbooks = logbooks.filter(logbook => selectedIds.includes(logbook.id));

  return (
    <div>
      Ids are:
      {selectedIds.map(id => (
        <div key={id}>
          {id}
        </div>
      ))}
    </div>
  )
}