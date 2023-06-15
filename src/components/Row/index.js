import React, { useContext, useRef } from 'react';
import { JetsSeat } from '../Seat';
import './index.css';

export const JetsRow = ({ seats, top }) => {
  const elementRef = useRef(null);

  return (
    <div className="jets-row" style={{ top }} ref={elementRef}>
      {seats?.map(seat => (
        <JetsSeat key={seat.uniqId} data={seat} />
      ))}
    </div>
  );
};
