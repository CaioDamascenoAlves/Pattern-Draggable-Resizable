import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const PersistentGridLayout = () => {
  // Função para salvar o layout no localStorage
  const saveToLocalStorage = (layout) => {
    localStorage.setItem('gridLayout', JSON.stringify(layout));
  };

  // Função para carregar o layout do localStorage (se existir)
  const getFromLocalStorage = () => {
    const savedLayout = localStorage.getItem('gridLayout');
    return savedLayout ? JSON.parse(savedLayout) : null;
  };

  // Layout padrão se não houver persistência
  const defaultLayout = [
    { i: '1', x: 0, y: 0, w: 2, h: 2 },
    { i: '2', x: 2, y: 0, w: 2, h: 2 },
    { i: '3', x: 4, y: 0, w: 2, h: 2 }
  ];

  // Inicializa o layout a partir do localStorage ou usa o padrão
  const [layout, setLayout] = useState(getFromLocalStorage() || defaultLayout);

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    saveToLocalStorage(newLayout); // Salva o layout atualizado no localStorage
  };

  return (
    <div>
      <h1>React Grid Layout Demo</h1>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}         // Define 12 colunas
        rowHeight={30}     // Altura de cada linha (em pixels)
        width={1200}       // Largura total do grid
        onLayoutChange={onLayoutChange} // Callback para salvar o layout
        isResizable={true} // Ativa redimensionamento
        isDraggable={true} // Ativa drag-and-drop
      >
        <div key="1" className="box" style={{ backgroundColor: 'lightblue' }}>
          Box 1
        </div>
        <div key="2" className="box" style={{ backgroundColor: 'lightgreen' }}>
          Box 2
        </div>
        <div key="3" className="box" style={{ backgroundColor: 'lightcoral' }}>
          Box 3
        </div>
      </GridLayout>
    </div>
  );
};

export default PersistentGridLayout;
