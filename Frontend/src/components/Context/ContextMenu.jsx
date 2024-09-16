import React, { useEffect, useRef } from "react";
import "./ContextMenu.css";

const ContextMenu = ({ position, onClose, onDelete, itemName }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <button onClick={onDelete}>
        <span role="img" aria-label="delete" style={{ marginRight: "8px" }}>
          🗑️
        </span>
        Excluir Item {itemName}
      </button>
    </div>
  );
};

export default ContextMenu;
