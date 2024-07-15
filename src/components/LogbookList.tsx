import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom";
import { useLogbook } from "../context/LogbookContext";
import { useState } from 'react';

export const LogbookList = () => {
  const longPressDuration = 1000;

  const { logbooks } = useLogbook();
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  let holdTimer: any;

  const handleMouseDown = (id: number) => {
    holdTimer = setTimeout(() => {
      setIsSelecting(true);
      setSelectedIds(new Set([id]));
    }, longPressDuration);
  };

  const handleMouseUp = () => {
    clearTimeout(holdTimer);
  }

  const toggleSelection = (id: number) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  }

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