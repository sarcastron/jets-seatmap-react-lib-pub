import React, { useContext } from 'react';
import { JetsContext, LOCALES_MAP } from '../../common';
import { JetsBulk } from '../Bulk';
import { JetsDeckExit } from '../DeckExit';
import { JetsRow } from '../Row';
import './index.css';

const DECK_LOCALE_KEY = 'deck';

export const JetsDeck = ({ rows, number, lang, exits, bulks }) => {
  const { params } = useContext(JetsContext);

  const deckStyle = { height: params?.decksHeight?.length ? params.decksHeight[number - 1] : 0 };

  const titleStyle = {
    transform: `scale(${params.antiScale})`,
  };

  const generateUniqueKey = (topOffset = 0, type = '') => {
    return `${topOffset}-${type}`;
  };

  return (
    <div className="jets-deck" style={deckStyle}>
      {number && (
        <div className="jets-deck--title" style={titleStyle}>
          {LOCALES_MAP[lang][DECK_LOCALE_KEY]}: {number}
        </div>
      )}

      {rows.map(row => (
        <JetsRow key={row.id} seats={row.seats} top={row.topOffset} />
      ))}

      {exits.length
        ? exits.map(({ topOffset, type }, index) => {
            return (
              <JetsDeckExit key={generateUniqueKey(topOffset, type)} type={type} index={index} topOffset={topOffset} />
            );
          })
        : null}
      {bulks.length
        ? bulks.map(({ id, type, align, width, height, iconType, xOffset, topOffset }) => {
            return (
              <JetsBulk
                id={id}
                key={generateUniqueKey(topOffset, type)}
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
