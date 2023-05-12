import React, { useContext, useRef, useLayoutEffect, useEffect, useState } from 'react';
import { JetsButton } from '../Button';
import { DEFAULT_TOOLTIP_WIDTH, JetsContext, LOCALES_MAP } from '../../common';
import './index.css';

const CANCEL_BTN_KEY = 'cancel';
const SELECT_BTN_KEY = 'select';
const UNSELECT_BTN_KEY = 'unselect';

export const JetsTooltip = ({ data, parentRow }) => {
  const { onTooltipClose, onSeatSelect, isSelectAvailable, onSeatUnselect, colorTheme } = useContext(JetsContext);

  const elementRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState(0);

  const {
    tooltipBackgroundColor,
    tooltipHeaderColor,
    tooltipBorderColor,
    tooltipFontColor,
    tooltipIconColor,
    tooltipIconBorderColor,
    tooltipIconBackgroundColor,
    tooltipSelectButtonTextColor,
    tooltipSelectButtonBackgroundColor,
    tooltipCancelButtonTextColor,
    tooltipCancelButtonBackgroundColor,
  } = colorTheme;

  const {
    number,
    classType,
    top,
    left,
    features,
    measurements,
    price,
    passenger,
    nextPassanger,
    passengerTypes,
    lang,
    rowName,
    antiScale,
    transformOrigin,
    width,
    seatmapHeight,
    pointerOffset,
  } = data;

  const pointerHeight = 14;
  const seatHeight = data.size.height;

  console.log(colorTheme);

  const parentPosition = parentRow.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
  // bottom position by default
  // const negatePosition = Number(parentPosition + height > seatmapHeight);

  // top position by default
  const negatePosition = Number(parentPosition - height > 64); // 64 is paddingTop of seatmap in CSS
  const styleTop = top + seatHeight * 0.5 - (height * antiScale + seatHeight + pointerHeight) * negatePosition;

  const style = {
    width: width,
    transformOrigin: transformOrigin,
    transform: `scale(${antiScale})`,
    top: styleTop,
    left,
    background: tooltipBackgroundColor,
    borderColor: tooltipBorderColor,
    color: tooltipFontColor,
  };

  const pointerStyle = {
    top: negatePosition * height,
    left: pointerOffset / antiScale,
    transform: `rotate(${180 * (1 - negatePosition)}deg)`,
    borderColor: `${tooltipBorderColor} transparent transparent transparent`,
  };

  useLayoutEffect(() => {
    setPosition(elementRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top);
    setHeight(elementRef.current.clientHeight);

    return;
  }, [data]);

  const isSelectDisabled = () => {
    return (
      !isSelectAvailable ||
      (nextPassanger?.passengerType &&
        passengerTypes?.length &&
        !passengerTypes?.includes(nextPassanger?.passengerType))
    );
  };

  return (
    <div style={style} className="jets-tooltip" ref={elementRef}>
      <div className="jets-tooltip--arrow-pointer" style={pointerStyle}></div>
      <div className="jets-tooltip--body">
        <div className="jets-tooltip--content">
          <div className="jets-tooltip--header" style={{ color: tooltipHeaderColor }}>
            <div className="jets-tooltip--header-title">
              {rowName || classType} {number}
            </div>
            <div className="jets-tooltip--header-price">{price}</div>
          </div>

          <div className="jets-tooltip--features">
            <ul>
              {features.map(({ uniqId, title, icon, value }) => (
                <li className="jets-tooltip--feature" key={uniqId}>
                  {icon ? (
                    <span
                      className="svg_span"
                      dangerouslySetInnerHTML={{
                        __html: icon,
                      }}
                    ></span>
                  ) : (
                    <span>{title}</span>
                  )}
                  <div style={{ color: tooltipFontColor }}>{value}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="jets-tooltip--measurements">
            {measurements.map(({ uniqId, title, icon, value }) => (
              <div
                style={{ borderColor: tooltipIconBorderColor, background: tooltipIconBackgroundColor }}
                className="jets-tooltip--measurement"
                key={uniqId}
              >
                {icon ? (
                  <span
                    className="svg_span"
                    style={{ fill: tooltipIconColor }}
                    dangerouslySetInnerHTML={{
                      __html: icon,
                    }}
                  ></span>
                ) : (
                  <span></span>
                )}
                <div className="jets-tooltip--measurement-value">{title}</div>
                <div className="jets-tooltip--measurement-value">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="jets-tooltip--btns-block">
          <JetsButton
            onClick={onTooltipClose}
            content={LOCALES_MAP[lang][CANCEL_BTN_KEY]}
            className="jets-btn jets-tooltip--btn"
            style={{ color: tooltipCancelButtonTextColor, backgroundColor: tooltipCancelButtonBackgroundColor }}
          />
          {passenger ? (
            <JetsButton
              onClick={() => onSeatUnselect(data)}
              content={LOCALES_MAP[lang][UNSELECT_BTN_KEY]}
              className="jets-btn jets-tooltip--btn "
              style={{ color: tooltipSelectButtonTextColor, backgroundColor: tooltipSelectButtonBackgroundColor }}
            />
          ) : (
            <JetsButton
              disabled={isSelectDisabled()}
              onClick={() => onSeatSelect(data)}
              content={LOCALES_MAP[lang][SELECT_BTN_KEY]}
              className="jets-btn jets-tooltip--btn "
              style={{ color: tooltipSelectButtonTextColor, backgroundColor: tooltipSelectButtonBackgroundColor }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
