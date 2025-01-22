import { LogBookRecordType } from "../context/LogbookContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import './LogbookEntry.css'

export const LogbookEntry = ({ record, onDelete }: { record: LogBookRecordType, onDelete: (id: string) => void }) => {

  return (
    <li className="logbookEntry">
      <div className="logbookEntryContainer">
        <div className="text">
          <div className="value">{record.value}</div>
          <div className="date">{record.added.toLocaleTimeString()}</div>
        </div>
        <button className="delete" onClick={() => onDelete(record.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  )
}