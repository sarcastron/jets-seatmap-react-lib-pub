import React, { useContext, useRef } from 'react';
import { JetsContext } from '../../common';

import './index.css';

export const JetsWing = ({ wingsInfo }) => {
  const { params, colorTheme } = useContext(JetsContext);
  const elementRef = useRef(null);

  const style = {
    top: wingsInfo.start,
    height: wingsInfo.length,
    width: params.innerWidth,
  };

  const wingStyle = {
    background: `${colorTheme?.fuselageWingsColor}`,
  };

  return (
    <div className={`jets-wings`} style={style} ref={elementRef}>
      <div className={'wing'} style={{ ...wingStyle }}></div>
      <div className={'wing'} style={{ ...wingStyle }}></div>
    </div>
  );
};
