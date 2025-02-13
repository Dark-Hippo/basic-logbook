import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';
import './Settings.css';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="setting-item">
        <ThemeToggle
          label="Dark Mode"
          isChecked={theme === 'dark'}
          onChange={toggleTheme}
        />
      </div>
    </div>
  );
};
