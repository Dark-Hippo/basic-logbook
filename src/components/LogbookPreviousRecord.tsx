import { Link } from "react-router-dom"
import { RecordByDateType } from "../types/RecordsByDateType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

import './LogbookPreviousRecord.css'

const getDateText = (date: string) => {
  if (new Date(date).toDateString() === new Date().toDateString()) {
    return 'Today'
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  if (new Date(date).toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  }

  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
}

export const LogbookPreviousRecord = ({ logbookId, date, recordByDate }: { logbookId: number, date: string, recordByDate: RecordByDateType }) => {

  const dateText = getDateText(date);

  return (
    <li className="previousLogbookEntry">
      <Link to={`/logbook/${logbookId}/${date}`}>
        <div className="previousLogbookEntryContainer">
          <div className="text">
            <div className="date">{dateText}</div>
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