import React from 'react';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './Switcher.css'; // Certifique-se de criar este arquivo CSS

const ThemeSwitcher = ({ theme, setTheme }) => {
  const handleChange = (checked) => {
    setTheme(checked ? 'light' : 'dark');
  };

  return (
    <div className="theme-switcher">
      <span className="switch-icon">
        <FontAwesomeIcon icon={faMoon} />
      </span>
      <Switch
        onChange={handleChange}
        checked={theme === 'light'}
        className="react-switch"
        id="theme-switch"
        offColor="#888" // Cor quando o switch está desligado
        onColor="#f5a623" // Cor quando o switch está ligado
        offHandleColor="#fff" // Cor da alavanca quando o switch está desligado
        onHandleColor="#fff" // Cor da alavanca quando o switch está ligado
      />
      <span className="switch-icon">
        <FontAwesomeIcon icon={faSun} />
      </span>
    </div>
  );
};

export default ThemeSwitcher;
