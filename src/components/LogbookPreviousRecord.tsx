import { Link } from "react-router-dom"
import { RecordByDateType } from "../types/RecordsByDateType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

import './LogbookPreviousRecord.css'

export const LogbookPreviousRecord = ({ logbookId, date, recordByDate }: { logbookId: number, date: string, recordByDate: RecordByDateType }) => {

  const regionDate = new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });

  return (
    <li className="previousLogbookEntry">
      <Link to={`/logbook/${logbookId}/${date}`}>
        <div className="previousLogbookEntryContainer">
          <div className="text">
            <div className="date">{regionDate}</div>
            <div className="value">Total: {recordByDate.total}</div>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </Link>
    </li>
  )
}