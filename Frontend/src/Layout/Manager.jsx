import React, { useState, useCallback } from "react";
import useLayout from "../hooks/UseLayout";
import Sidebar from "../components/SiderBar/SiderBar";
import GridLayoutWrapper from "../components/GridLayout/GridLayoutWrapper";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./style.css";

const LayoutManager = () => {
  const [theme, setTheme] = useState("light");
  const { layout, addItem, deleteItem, updateLayout } = useLayout();

  const handleThemeChange = useCallback((newTheme) => {
    setTheme(newTheme);
    document.body.className = newTheme; // Aplica o tema ao body
  }, []);

  return (
    <div className={`app-container ${theme}`}>
      <Sidebar addItem={addItem} theme={theme} setTheme={handleThemeChange} />
      <main className="main-content">
        <h1>Layout Manager</h1>
        <GridLayoutWrapper 
          layout={layout}
          onLayoutChange={updateLayout}
          onDeleteItem={deleteItem}
        />
      </main>
    </div>
  );
};

export default LayoutManager;