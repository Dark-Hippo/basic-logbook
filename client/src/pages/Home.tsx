import React from "react";
import { useState } from "react";
import { AddNewLogbookModal } from "../components/AddNewLogbookModal"
import { LogbookList } from "../components/LogbookList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
      <div className="buttonContainer">
        {isSelecting && (
          <>
            <Link to='/compare'
              state={{ selectedIds: Array.from(selectedIds) }}
            >
              <button className="compareButton">
                <FontAwesomeIcon className='icon' icon={faChartLine} />
                Compare
              </button>
            </Link>
            <button className='cancelButton' onClick={() => setIsSelecting(false)}>
              <FontAwesomeIcon className='icon' icon={faCancel} />
              Cancel
            </button>
          </>
        ) || (
            <AddNewLogbookModal />
          )}
      </div>
    </>
  )
}