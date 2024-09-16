import React from 'react';

const LayoutControls = ({ addNewItem }) => {
  return (
    <div className="layout-controls">
      <button onClick={addNewItem}>Adicionar Novo Item</button>
    </div>
  );
};

export default LayoutControls;
