import { LogBookRecordType } from "../context/LogbookContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export const LogbookEntry = ({ record, onDelete }: { record: LogBookRecordType, onDelete: (id: string) => void }) => {

  return (
    <li>
      {record.added.toLocaleTimeString()} - {record.value}
      <button onClick={() => onDelete(record.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  )
}