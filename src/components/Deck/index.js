import React, { useContext, useRef } from 'react';
import { JetsContext, LOCALES_MAP, DEFAULT_DECK_TITLE_HEIGHT, DEFAULT_DECK_PADDING_SIZE } from '../../common';
import { JetsBulk } from '../Bulk';
import { JetsDeckExit } from '../DeckExit';
import { JetsWing } from '../Wing';
import { JetsRow } from '../Row';
import './index.css';

const DECK_LOCALE_KEY = 'deck';

export const JetsDeck = ({ deck, lang, exits, bulks, hideDeckTitle }) => {
  const { rows, number, height, width, wingsInfo } = deck || {};

  const { params, colorTheme } = useContext(JetsContext);
  const elementRef = useRef(null);

  const deckStyle = {
    height,
    padding: `0 ${DEFAULT_DECK_PADDING_SIZE}px 0 ${DEFAULT_DECK_PADDING_SIZE}px`,
    transform: params?.isHorizontal && !params.rightToLeft ? 'rotate(180deg)' : '',
    margin: '0 auto',
  };

  const titleStyle = {
    transform: `scale(${params.antiScale}) translateY(30px)`,
    height: `${DEFAULT_DECK_TITLE_HEIGHT}px`,
    color: colorTheme.deckLabelTitleColor,
    top: '0px',
  };

  return (
    <div className="jets-deck" style={deckStyle} ref={elementRef}>
      {params?.visibleWings && <JetsWing wingsInfo={wingsInfo} />}

      {number && !hideDeckTitle && (
        <div className="jets-deck--title" style={titleStyle}>
          {LOCALES_MAP[lang][DECK_LOCALE_KEY]}: {number}
        </div>
      )}

      {rows.map(row => (
        <JetsRow key={row.uniqId} seats={row.seats} top={row.topOffset} />
      ))}

      {exits && exits.length
        ? exits.map(({ topOffset, type, uniqId }, index) => {
            return <JetsDeckExit key={uniqId} type={type} index={index} topOffset={topOffset} />;
          })
        : null}
      {bulks && bulks.length
        ? bulks.map(({ id, uniqId, type, align, width, height, iconType, xOffset, topOffset }) => {
            return (
              <JetsBulk
                id={id}
                key={uniqId}
                type={type}
                align={align}
                width={width}
                height={height}
                iconType={iconType}
                xOffset={xOffset}
                topOffset={topOffset}
              />
            );
          })
        : null}
    </div>
  );
};
