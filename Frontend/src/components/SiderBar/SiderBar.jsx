import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ThemeSwitcher from '../../Theme/Switcher';
import './Sidebar.css';

const Sidebar = ({ addItem, theme, setTheme }) => {
  return (
    <aside className="sidebar">
      <h2>Menu</h2>
      <button className="sidebar-button" onClick={addItem}>
        <FontAwesomeIcon icon={faPlus} className="sidebar-icon" />
        Adicionar Novo Item
      </button>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
    </aside>
  );
};

export default Sidebar;
