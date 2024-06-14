import { Link } from "react-router-dom";
import { useLogbook } from "../context/LogbookContext";

export const LogbookList = () => {

  const { logbooks } = useLogbook();

  return (
    <section>
      <h2>Logbooks</h2>
      <ul>
        {logbooks.map((logbook) => (
          <li key={logbook.id}>
            <Link to={'logbook/' + logbook.id}>{logbook.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}