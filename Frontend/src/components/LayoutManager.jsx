import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import axios from "axios";
import LayoutControls from "./LayoutControls";
import LayoutItem from "./GridLayout/LayoutItem";
import ThemeSwitcher from "./ThemeSwitcher";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./style.css"

const LayoutManager = () => {
  // Inicialize com array vazio para evitar o erro
  const [layout, setLayout] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Carregar o layout do backend
    loadLayoutFromBackend();
  }, []);

  const loadLayoutFromBackend = async () => {
    try {
      const localLayout = JSON.parse(localStorage.getItem("layout"));
      if (localLayout) {
        setLayout(localLayout);
      } else {
        const response = await axios.get(
          "http://localhost:3000/api/load-layout"
        );
        if (response.data && Array.isArray(response.data)) {
          setLayout(response.data);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar layout:", error);
    }
  };

  const saveLayoutToBackend = async (newLayout) => {
    localStorage.setItem("layout", JSON.stringify(newLayout));
    try {
      await axios.post("http://localhost:3000/api/save-layout", newLayout);
    } catch (error) {
      console.error("Erro ao salvar layout:", error);
    }
  };

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    saveLayoutToBackend(newLayout);
  };

  const addNewItem = () => {
    const newItem = {
      i: `${layout.length + 1}`,
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      minW: 1,
      minH: 1,
    };
    const newLayout = [...layout, newItem];
    setLayout(newLayout);
    saveLayoutToBackend(newLayout);
  };

  const handleDeleteItem = (itemId) => {
    const newLayout = layout.filter(item => item.i !== itemId);
    setLayout(newLayout);
    saveLayoutToBackend(newLayout);
  };

  return (
    <div className={`layout-container ${theme}`}>
      <h1>Layout Manager</h1>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <LayoutControls addNewItem={addNewItem} />
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={onLayoutChange}
        isDraggable={true}
        isResizable={true}
        compactType="vertical"
        preventCollision={false}
      >
        {layout.map((item) => (
          <div key={item.i} data-grid={item}>
            <LayoutItem data={item} onDelete={handleDeleteItem} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default LayoutManager;
