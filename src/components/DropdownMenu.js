// src/components/DropdownMenu.js
import React, { useState } from "react";
import { FaPlus ,FaLock, FaLink, FaUpload, FaCreativeCommonsSampling, FaBox} from "react-icons/fa";

function DropdownMenu({ onAddModule, onAddLink, onUploadFile }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (action) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="dropdown-menu">
        <div className="course-title">Course Builder</div>
      <div className="mtbn">
        <button onClick={handleToggle}>
          <FaPlus style={{marginRight:"8px"}}/> Add
        </button>
        {isOpen && (
          <div className="dropdown-options">
            <button onClick={() => handleOptionClick(onAddModule)}>
            <FaBox style={{marginRight:"8px"}}/>Create Module
            </button>
            <button onClick={() => handleOptionClick(onAddLink)}>
            <FaLink style={{marginRight:"8px"}}/> Add Link
            </button>
            <button onClick={() => handleOptionClick(onUploadFile)}>
            <FaUpload style={{marginRight:"8px"}}/> Upload File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownMenu;
