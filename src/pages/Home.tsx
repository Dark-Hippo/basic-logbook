import { useState } from "react";
import { AddNewLogbookModal } from "../components/AddNewLogbookModal"
import { LogbookList } from "../components/LogbookList"

export const Home = () => {
  const longPressDuration = 1000;
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set<number>());
  let holdTimer: any;

  const mouseDownHandler = (id: number) => {
    holdTimer = setTimeout(() => {
      setIsSelecting(true);
      setSelectedIds(new Set([id]));
    }, longPressDuration);
  };

  const mouseUpHandler = () => {
    clearTimeout(holdTimer);
  };

  const toggleSelectionHandler = (id: number) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };

  return (
    <>
      <LogbookList
        handleMouseDown={mouseDownHandler}
        handleMouseUp={mouseUpHandler}
        toggleSelection={toggleSelectionHandler}
        isSelecting={isSelecting}
        selectedIds={selectedIds} />
      <AddNewLogbookModal />
    </>
  )
}