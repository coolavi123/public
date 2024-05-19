// src/components/Resource.js
import React from 'react';
import { useDrag } from 'react-dnd';

function Resource({ resource, dispatch }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'RESOURCE',
    item: { id: resource.id, sourceId: resource.moduleId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const deleteResource = () => {
    dispatch({ type: 'DELETE_RESOURCE', id: resource.id });
  };

  return (
    <div className="resource" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {resource.type === 'link' && (
        <div>
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            {resource.name}
          </a>
          <button onClick={deleteResource}>Delete</button>
        </div>
      )}
      {resource.type === 'file' && (
        <div>
          <span>{resource.name}</span>
          <button onClick={deleteResource}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Resource;
