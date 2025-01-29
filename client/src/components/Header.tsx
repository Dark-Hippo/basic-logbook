import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faMoon as faMoonSolid,
  faBars,
  faGear,
  faRightToBracket,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { faMoon as faMoonRegular } from '@fortawesome/free-regular-svg-icons';
import { useTheme } from '../context/ThemeContext';
import { Link, useParams } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

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

  const handleClose = () => setIsMenuOpen(false);

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
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => setIsMenuOpen(true)}
        />
      </div>

      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={handleClose}>
        <div className={`menu-sidebar ${isMenuOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
          <button className="close-button" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <ThemeToggle
            icon={themeIcon}
            label="Theme"
            isChecked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <button>
            <FontAwesomeIcon icon={faGear} />
            <span>Settings</span>
          </button>
          <button>
            <FontAwesomeIcon icon={faRightToBracket} />
            <span>Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};