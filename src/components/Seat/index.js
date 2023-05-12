import React, { useContext, useEffect, useRef, useState } from 'react';
import { JetsContext, ENTITY_TYPE_MAP } from '../../common';
import { SeatIcon } from './ui/SeatIcon';

import './index.css';

const PASSENGER_BADGE_SIZE_COEF = 0.8;

export const JetsSeat = ({ data }) => {
  const { onSeatClick, params, colorTheme } = useContext(JetsContext);
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
      backgroundColor: colorTheme.defaultPassengerBadgeColor,
    };
  });

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
    strokeColor: colorTheme.seatStrokeColor,
    armrestColor: colorTheme.seatArmrestColor,
    fillColor: color,
    strokeWidth: colorTheme.seatStrokeWidth,
  };

  const indexContentStyle = {
    transform: `rotate(0deg) scale(${params.antiScale})`,
    color: colorTheme.seatLabelColor,
  };

  const updatePassengerStyle = () => {
    if (!$component.current) return;

    const $seatSvg = $component.current.querySelector('.seat');

    if (!$seatSvg) return;

    const { height } = $seatSvg.getBoundingClientRect();
    const preparedHeight = height * params.antiScale;

    const newPassengerStyle = { ...passengerStyle };

    newPassengerStyle.top = preparedHeight / 2 - newPassengerStyle.height / 2;

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
