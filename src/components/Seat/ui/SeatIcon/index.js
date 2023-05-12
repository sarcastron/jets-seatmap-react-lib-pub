import React from 'react';

import { seatTemplateService } from '../../service';

export const SeatIcon = ({ seatType, style }) => {
  return (
    <div
      className="jets-seat-svg"
      dangerouslySetInnerHTML={{
        __html: seatTemplateService.getSeatIcon(seatType, style),
      }}
    />
  );
};

export default SeatIcon;
