import React from "react";
import GridLayout from "react-grid-layout";
import LayoutItem from "./LayoutItem";

const GridLayoutWrapper = ({ layout, onLayoutChange, onDeleteItem }) => {
  return (
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
          <LayoutItem data={item} onDelete={onDeleteItem} />
        </div>
      ))}
    </GridLayout>
  );
};

export default GridLayoutWrapper;
