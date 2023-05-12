import React, { useContext } from 'react';
import { JetsContext, LOCALES_MAP, DEFAULT_DECK_TITLE_HEIGHT, DEFAULT_DECK_PADDING_SIZE } from '../../common';
import { JetsBulk } from '../Bulk';
import { JetsDeckExit } from '../DeckExit';
import { JetsRow } from '../Row';
import './index.css';

const DECK_LOCALE_KEY = 'deck';

export const JetsDeck = ({ rows, number, lang, exits, bulks, height, width }) => {
  const { params, colorTheme } = useContext(JetsContext);

  const deckStyle = {
    height,
    width,
    padding: `0 ${DEFAULT_DECK_PADDING_SIZE}px 0 ${DEFAULT_DECK_PADDING_SIZE}px`,
    backgroundColor: colorTheme.floorColor,
    borderLeft: `solid ${colorTheme.deckBodyColor}`,
    borderRight: `solid ${colorTheme.deckBodyColor}`,
    borderWidth: `${colorTheme.deckBodyWidth}px`,
  };

  const titleStyle = {
    transform: `scale(${params.antiScale}) translateY(30px)`,
    height: `${DEFAULT_DECK_TITLE_HEIGHT}px`,
    color: colorTheme.deckLabelTitleColor,
    top: '0px',
  };

  return (
    <div className="jets-deck" style={deckStyle}>
      {number && (
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
