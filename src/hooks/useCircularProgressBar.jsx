import React, { useState, useCallback } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';

// Styles
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = ({ percentage }) => {
    const [showIcon, setShowIcon] = useState(false);
  
    const handleIconClick = () => {
      alert('Icon clicked!');
    };

    useCallback(() => {
      if (percentage === 100) setShowIcon(true);
    }, [])
  
    return <CircularProgressbar value={percentage} text={`${percentage}%`} />;
  };

export default CircularProgressBar;