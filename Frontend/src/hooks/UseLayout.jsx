import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useLayout = () => {
  const [layout, setLayout] = useState([]);

  const loadLayout = useCallback(async () => {
    try {
      const localLayout = JSON.parse(localStorage.getItem("layout"));
      if (localLayout) {
        setLayout(localLayout);
      } else {
        const response = await axios.get("http://localhost:3000/api/load-layout");
        if (response.data && Array.isArray(response.data)) {
          setLayout(response.data);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar layout:", error);
    }
  }, []);

  const saveLayout = useCallback(async (newLayout) => {
    localStorage.setItem("layout", JSON.stringify(newLayout));
    try {
      await axios.post("http://localhost:3000/api/save-layout", newLayout);
    } catch (error) {
      console.error("Erro ao salvar layout:", error);
    }
  }, []);

  const addItem = useCallback(() => {
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
    saveLayout(newLayout);
  }, [layout, saveLayout]);

  const deleteItem = useCallback((itemId) => {
    const newLayout = layout.filter(item => item.i !== itemId);
    setLayout(newLayout);
    saveLayout(newLayout);
  }, [layout, saveLayout]);

  const updateLayout = useCallback((newLayout) => {
    setLayout(newLayout);
    saveLayout(newLayout);
  }, [saveLayout]);

  useEffect(() => {
    loadLayout();
  }, [loadLayout]);

  return { layout, addItem, deleteItem, updateLayout };
};

export default useLayout;