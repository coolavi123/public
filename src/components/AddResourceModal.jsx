// AddResourceModal.js
import React, { useState } from 'react';

const AddResourceModal = ({ onClose, onAddResource }) => {
  const [resourceType, setResourceType] = useState('link');
  const [resourceData, setResourceData] = useState('');

  const handleAddResource = () => {
    const resource = resourceType === 'link' ? { type: 'link', url: resourceData } : { type: 'file', data: resourceData };
    onAddResource(resource);
    onClose();
  };

  return (
    <div>
      <h2>Add Resource</h2>
      <label>
        <input
          type="radio"
          value="link"
          checked={resourceType === 'link'}
          onChange={() => setResourceType('link')}
        />
        Link
      </label>
      <label>
        <input
          type="radio"
          value="file"
          checked={resourceType === 'file'}
          onChange={() => setResourceType('file')}
        />
        File
      </label>
      <input
        type="text"
        value={resourceData}
        onChange={(e) => setResourceData(e.target.value)}
        placeholder={resourceType === 'link' ? 'Enter URL' : 'Select File'}
      />
      <button onClick={handleAddResource}>Add</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddResourceModal;