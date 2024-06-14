import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faMoon as faMoonSolid } from '@fortawesome/free-solid-svg-icons'
import { faMoon as faMoonRegular } from '@fortawesome/free-regular-svg-icons'
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

type HeaderProps = {
  back: boolean;
  title: string;
}

export const Header = ({ back, title }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const icon = theme === 'light' ? faMoonRegular : faMoonSolid;

  return (
    <header>
      <div className="left">
        {back &&
          <button>
            <Link to="/">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
          </button>}
      </div>
      <div className="middle">{title}</div>
      <div className="right"><FontAwesomeIcon icon={icon} onClick={toggleTheme} /></div>
    </header>
  )
}