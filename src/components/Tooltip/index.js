import React, { useContext } from 'react';
import { JetsButton } from '../Button';
import { DEFAULT_TOOLTIP_WIDTH, JetsContext, LOCALES_MAP } from '../../common';
import './index.css';

const CANCEL_BTN_KEY = 'cancel';
const SELECT_BTN_KEY = 'select';
const UNSELECT_BTN_KEY = 'unselect';

export const JetsTooltip = ({ data }) => {
  const { onTooltipClose, onSeatSelect, isSelectAvailable, onSeatUnselect } = useContext(JetsContext);

  const {
    number,
    classType,
    top,
    left,
    features,
    id,
    price,
    passenger,
    nextPassanger,
    passengerTypes,
    lang,
    rowName,
    antiScale,
    transformOrigin,
  } = data;

  const style = {
    width: DEFAULT_TOOLTIP_WIDTH,
    transformOrigin: transformOrigin,
    transform: `scale(${antiScale})`,
    top,
    left,
  };

  const isSelectDisabled = () => {
    return (
      !isSelectAvailable ||
      (nextPassanger?.passengerType &&
        passengerTypes?.length &&
        !passengerTypes?.includes(nextPassanger?.passengerType))
    );
  };

  return (
    <div style={style} className="jets-tooltip">
      <div className="jets-tooltip--body">
        <div className="jets-tooltip--content">
          <div className="jets-tooltip--header">
            <div className="jets-tooltip--header-title">
              {rowName || classType} {number}
            </div>
            <div className="jets-tooltip--header-price">{price}</div>
          </div>

          <div className="jets-tooltip--features">
            <ul>
              {features.map(({ title, icon, value }) => (
                <li className="jets-tooltip--feature" key={title}>
                  <span>{icon ? <img src={require(`../../assets/img/${icon}`)} /> : value}</span>
                  <div>{title}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="jets-tooltip--btns-block">
          <JetsButton
            onClick={onTooltipClose}
            content={LOCALES_MAP[lang][CANCEL_BTN_KEY]}
            className="jets-btn jets-tooltip--btn jets-cancel-btn"
          />
          {passenger ? (
            <JetsButton
              onClick={() => onSeatUnselect(data)}
              content={LOCALES_MAP[lang][UNSELECT_BTN_KEY]}
              className="jets-btn jets-tooltip--btn jets-select-btn"
            />
          ) : (
            <JetsButton
              disabled={isSelectDisabled()}
              onClick={() => onSeatSelect(data)}
              content={LOCALES_MAP[lang][SELECT_BTN_KEY]}
              className="jets-btn jets-tooltip--btn jets-select-btn"
            />
          )}
        </div>
      </div>
    </div>
  );
};
