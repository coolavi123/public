// src/components/Module.js
import React from 'react';
import PopupMenu from './PopupMenu';
import { useDrop } from 'react-dnd';

function Module({ module, dispatch }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'RESOURCE',
    drop: (item) =>
      dispatch({
        type: 'MOVE_RESOURCE',
        resourceId: item.id,
        sourceId: item.sourceId,
        destinationId: module.id,
      }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const editModule = () => {
    const newName = prompt('Enter new module name:', module.name);
    if (newName) {
      dispatch({ type: 'RENAME_MODULE', id: module.id, name: newName });
    }
  };

  const deleteModule = () => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      dispatch({ type: 'DELETE_MODULE', id: module.id });
    }
  };

  return (
    <div className="module" ref={drop} style={{ backgroundColor: isOver ? '#e0e0e0' : '#f9f9f9' }}>
      <div className="module-header">
        <h2>{module.name}</h2>
        <PopupMenu onEdit={editModule} onDelete={deleteModule} />
      </div>
    </div>
  );
}

export default Module;
