import React, { useState } from 'react';
import { DEFAULT_STYLE_POSITION } from '../../common';

import './index.css';

export const JetsDeckExit = ({ type, index, topOffset }) => {
  const [style, setStyle] = useState(() => {
    const xOffset = 0;

    return {
      top: topOffset,
      left: type === 'left' ? xOffset : DEFAULT_STYLE_POSITION,
      right: type === 'right' ? xOffset : DEFAULT_STYLE_POSITION,
    };
  });

  return (
    <div className="deck-exit" style={style}>
      {type === 'left' ? (
        <img className="deck-exit__image" src={require('../../assets/img/exit-label-left.png')} />
      ) : (
        <img className="deck-exit__image" src={require('../../assets/img/exit-label-right.png')} />
      )}
    </div>
  );
};
