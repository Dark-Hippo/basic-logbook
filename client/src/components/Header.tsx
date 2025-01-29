import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faMoon as faMoonSolid,
  faBars,
  faGear,
  faRightToBracket
} from '@fortawesome/free-solid-svg-icons';
import { faMoon as faMoonRegular } from '@fortawesome/free-regular-svg-icons';
import { useTheme } from '../context/ThemeContext';
import { Link, useParams } from 'react-router-dom';

import './Header.css';

type HeaderProps = {
  back: boolean;
  title: string;
}

export const Header = ({ back, title }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logbookId, date } = useParams<{ logbookId: string, date: string }>();
  const themeIcon = theme === 'light' ? faMoonRegular : faMoonSolid;
  const backLink = date ? `/logbook/${logbookId}` : '/';

  return (
    <header>
      <div className="left">
        {back && (
          <Link to={backLink}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        )}
      </div>
      <div className="middle">{title}</div>
      <div className="right">
        <div className="menu-container">
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {isMenuOpen && (
            <div className="menu-dropdown">
              <button onClick={toggleTheme}>
                <FontAwesomeIcon icon={themeIcon} />
                <span>Theme</span>
              </button>
              <button>
                <FontAwesomeIcon icon={faGear} />
                <span>Settings</span>
              </button>
              <button>
                <FontAwesomeIcon icon={faRightToBracket} />
                <span>Login</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};