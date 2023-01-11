import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  JetsContext,
  ENTITY_TYPE_MAP,
  BASE_ARMREST_COLOR,
  BASE_PASSENGER_BADGE_COLOR,
  BASE_SEAT_STROKE_WIDTH,
  SEAT_STATUS_COLOR_MAP,
  BASE_SEAT_COLOR,
} from '../../common';
import { SeatIcon } from './ui/SeatIcon';

import './index.css';

const PASSENGER_BADGE_SIZE_COEF = 0.8;

export const JetsSeat = ({ data }) => {
  const { onSeatClick, params } = useContext(JetsContext);
  const { letter, type, status, size, passenger, color, rotation, seatType, topOffset, leftOffset } = data;
  const { index, aisle } = ENTITY_TYPE_MAP;
  const componentClassNames = `jets-seat jets-${type} jets-${status} jets-seat-r-${rotation}`;

  const $component = useRef();

  const [passengerStyle, setPassengerStyle] = useState(() => {
    return {
      width: size.width * PASSENGER_BADGE_SIZE_COEF,
      height: size.width * PASSENGER_BADGE_SIZE_COEF,
      left: size.width / 2 - size.width * (PASSENGER_BADGE_SIZE_COEF / 2),
      top: size.height / 2 - size.width * (PASSENGER_BADGE_SIZE_COEF / 2),
      backgroundColor: BASE_PASSENGER_BADGE_COLOR,
    };
  });

  const getSeatColor = () => {
    if (status === 'available') return SEAT_STATUS_COLOR_MAP['available'];

    return BASE_SEAT_COLOR;
  };

  const getSeatContent = () => {
    if (type === index || type === aisle) return letter;

    if (passenger) return passenger.abbr || 'P';

    return '';
  };

  const style = {
    width: size.width,
    height: size.height,
    top: topOffset,
    left: leftOffset,
  };

  const svgStyle = {
    strokeColor: getSeatColor(),
    armrestColor: BASE_ARMREST_COLOR,
    fillColor: color,
    strokeWidth: BASE_SEAT_STROKE_WIDTH,
  };

  const indexContentStyle = {
    transform: `rotate(0deg) scale(${params.antiScale})`,
  };

  const updatePassengerStyle = () => {
    const $seatSvg = $component.current.querySelector('.seat');

    if (!$seatSvg) return;

    const { height } = $seatSvg.getBoundingClientRect();

    const newPassengerStyle = { ...passengerStyle };

    newPassengerStyle.top = height / 2 - newPassengerStyle.height / 2;

    if (passenger?.passengerColor) {
      newPassengerStyle.backgroundColor = passenger.passengerColor;
    }

    setPassengerStyle(newPassengerStyle);
  };

  useEffect(() => {
    if (!passenger) return;

    updatePassengerStyle();
  }, [passenger]);

  return (
    <div ref={$component} style={style} className={componentClassNames} onClick={e => onSeatClick(data, $component, e)}>
      {seatType && type !== index ? (
        <>
          <SeatIcon seatType={seatType} style={svgStyle} />
          {passenger && (
            <div className="jets-seat-passenger" style={passengerStyle}>
              {getSeatContent()}
            </div>
          )}
        </>
      ) : (
        <div style={indexContentStyle}>{getSeatContent()}</div>
      )}
    </div>
  );
};
