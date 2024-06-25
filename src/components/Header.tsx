import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faMoon as faMoonSolid } from '@fortawesome/free-solid-svg-icons'
import { faMoon as faMoonRegular } from '@fortawesome/free-regular-svg-icons'
import { useTheme } from '../context/ThemeContext';
import { Link, useParams } from 'react-router-dom';

import './Header.css';

type HeaderProps = {
  back: boolean;
  title: string;
}

export const Header = ({ back, title }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const { logbookId, date } = useParams<{ logbookId: string, date: string }>();
  const icon = theme === 'light' ? faMoonRegular : faMoonSolid;

  const backLink = date ? `/logbook/${logbookId}` : '/';

  return (
    <header>
      <div className="left">
        {back &&
          <Link to={backLink}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>}
      </div>
      <div className="middle">{title}</div>
      <div className="right"><FontAwesomeIcon icon={icon} onClick={toggleTheme} /></div>
    </header>
  )
}