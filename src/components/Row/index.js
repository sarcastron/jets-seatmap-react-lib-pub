import React, { useContext } from 'react';
import { JetsContext } from '../../common';
import { JetsSeat } from '../Seat';
import { JetsTooltip } from '../Tooltip';
import './index.css';

export const JetsRow = ({ seats, top }) => {
  const { activeTooltip } = useContext(JetsContext);

  const checkRowIncludes = () => {
    const found = seats.find(seat => seat?.id === activeTooltip?.id);
    return !!found;
  };

  return (
    <div className="jets-row" style={{ top }}>
      {checkRowIncludes() && <JetsTooltip data={activeTooltip} />}
      {seats?.map(seat => (
        <JetsSeat key={seat.id} data={seat} />
      ))}
    </div>
  );
};
