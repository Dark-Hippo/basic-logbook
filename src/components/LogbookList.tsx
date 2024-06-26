import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom";
import { useLogbook } from "../context/LogbookContext";

export const LogbookList = () => {

  const { logbooks } = useLogbook();

  return (
    <section className='logbookList'>
      <h1>Logbooks</h1>
      <ul className='logbooks'>
        {logbooks.map((logbook) => (
          <li key={logbook.id} className='logbookListEntry'>
            <Link to={'logbook/' + logbook.id}>
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