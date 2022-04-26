import React, { useContext, useRef } from 'react';
import { DEFAULT_SEAT_MARGIN, JetsContext, SEAT_TYPE_MAP } from '../../common';

import './index.css';

export const JetsSeat = ({ data }) => {
  const { onSeatClick } = useContext(JetsContext);
  const { letter, type, status, size, passenger, color, rotation } = data;
  const { index, aisle, seat } = SEAT_TYPE_MAP;
  const classes = ['jets-seat', `jets-${type}`, `jets-${status}`, `jets-seat-r-${rotation} `];

  const getSeatBorder = () => {
    if (type === index || type === aisle) return;
    
    return `2px solid ${color}`;
  }
  
  const getSeatContent = () => {
    if (type === index || type === aisle) return letter;
    
    if (passenger) return passenger.abbr || 'P';
    
    return '';
  };
  
  const style = { width: size, height: size, margin: DEFAULT_SEAT_MARGIN, backgroundColor: passenger?.passengerColor, border: getSeatBorder() };
  const ref = useRef();

  return (
    <div ref={ref} onClick={() => onSeatClick(data, ref)} style={style} className={classes.join(' ')}>
      {getSeatContent()}
      {type === seat && <div className='jets-seat-pillow'></div>}
    </div>
  );
};
