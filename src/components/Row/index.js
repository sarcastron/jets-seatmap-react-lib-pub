import React from 'react';
import { JetsSeat } from '../Seat';
import './index.css';

export const JetsRow = ({ seats }) => {
  return (
    <div className="jets-row">
      {seats?.map(seat => (
        <JetsSeat key={seat.id} data={seat} />
      ))}
    </div>
  );
};
