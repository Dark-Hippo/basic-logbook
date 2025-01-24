import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom";
import { useLogbook } from "../context/LogbookContext";

interface LogbookListProps {
  handleMouseDown: (id: number) => void;
  handleMouseUp: () => void;
  toggleSelection: (id: number) => void;
  isSelecting: boolean;
  selectedIds: Set<number>;
}

export const LogbookList = (props: LogbookListProps) => {

  const { handleMouseUp, handleMouseDown, toggleSelection, selectedIds, isSelecting } = props;

  const { logbooks } = useLogbook();

  return (
    <section className='logbookList'>
      <h1>Logbooks</h1>
      <ul className='logbooks'>
        {logbooks.map((logbook) => (
          <li key={logbook.id} className='logbookListEntry'
            onMouseDown={() => handleMouseDown(logbook.id)}
            onTouchStart={() => handleMouseDown(logbook.id)}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            onMouseLeave={handleMouseUp} // Cancel the timer if the mouse leaves the element
            onClick={() => isSelecting && toggleSelection(logbook.id)}>
            {isSelecting && (
              <div className="graphCheckbox">
                <FontAwesomeIcon icon={selectedIds.has(logbook.id) ? faCheckSquare : faSquare} />
              </div>
            )}
            <Link to={'logbook/' + logbook.id} className={isSelecting ? 'disabledLink' : ''}>
              <div className="logbookName">
                {logbook.name}
              </div>
              <div className="logbookArrowIcon">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}