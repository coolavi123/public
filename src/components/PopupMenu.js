// src/components/PopupMenu.js
import React, { useState, useEffect, useRef } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

function PopupMenu({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (action) => {
    action();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="popup-menu" ref={menuRef}>
      <button onClick={handleToggle}>
        <FaEllipsisV />
      </button>
      {isOpen && (
        <div className="popup-options">
          <button onClick={() => handleOptionClick(onEdit)}>Edit Module</button>
          <button onClick={() => handleOptionClick(onDelete)}>Delete Module</button>
        </div>
      )}
    </div>
  );
}

export default PopupMenu;
