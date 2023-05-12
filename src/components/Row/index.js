import React, { useContext, useRef } from 'react';
import { JetsContext } from '../../common';
import { JetsSeat } from '../Seat';
import { JetsTooltip } from '../Tooltip';
import './index.css';

export const JetsRow = ({ seats, top }) => {
  const { activeTooltip } = useContext(JetsContext);
  const elementRef = useRef(null);

  const checkRowIncludes = () => {
    const found = seats.find(seat => seat?.uniqId === activeTooltip?.uniqId);
    return !!found;
  };

  return (
    <div className="jets-row" style={{ top }} ref={elementRef}>
      {checkRowIncludes() && <JetsTooltip data={activeTooltip} parentRow={elementRef}/>}
      {seats?.map(seat => (
        <JetsSeat key={seat.uniqId} data={seat} />
      ))}
    </div>
  );
};
