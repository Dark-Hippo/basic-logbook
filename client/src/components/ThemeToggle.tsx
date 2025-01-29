import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './ThemeToggle.css';

interface ThemeToggleProps {
  icon?: IconDefinition;
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

export const ThemeToggle = ({ icon, label, isChecked, onChange }: ThemeToggleProps) => {
  return (
    <button onClick={onChange}>
      {icon && <FontAwesomeIcon icon={icon} />}
      <span>{label}</span>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
        />
        <span className="toggle-slider"></span>
      </label>
    </button>
  );
};