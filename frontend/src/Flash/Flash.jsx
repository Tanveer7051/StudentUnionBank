// src/components/Flash.jsx
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';
import './Flash.css';

function Flash({ type = 'success', message = '' }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!message || !visible) return null;

  return (
    <div className={`flash-message ${type}`}>
      <span className="flash-text">{message}</span>
      <button className="flash-close" onClick={() => setVisible(false)}><CloseIcon/></button>
    </div>
  );
}

export default Flash;

