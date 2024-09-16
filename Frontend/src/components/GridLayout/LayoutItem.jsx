import React, { useState, useCallback, useRef } from "react";
import ContextMenu from "../Context/ContextMenu";

const LayoutItem = ({ data, onDelete }) => {
  const [menuPosition, setMenuPosition] = useState(null);
  const itemRef = useRef(null);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    const rect = itemRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMenuPosition({ x, y });
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMenuPosition(null);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete(data.i); // Passa o ID do item para a função de exclusão
    handleCloseMenu(); // Fecha o menu após a exclusão
  }, [data.i, onDelete, handleCloseMenu]);

  return (
    <div
      ref={itemRef}
      className="layout-item"
      onContextMenu={handleContextMenu}
      style={{ position: "relative" }}
    >
      <span>Item {data.i}</span>
      {menuPosition && (
        <ContextMenu
          position={menuPosition}
          onClose={handleCloseMenu}
          onDelete={handleDelete}
          itemName={data.i}
        />
      )}
    </div>
  );
};

export default LayoutItem;
