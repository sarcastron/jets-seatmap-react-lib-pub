import React from 'react';
import { LOCALES_MAP } from '../../common';
import { JetsRow } from '../Row';
import './index.css';

const DECK_LOCALE_KEY = 'deck'

export const JetsDeck = ({ rows, number, lang }) => {
  return (
    <div className="jets-deck">
      {number && <div className="jets-deck--title">{LOCALES_MAP[lang][DECK_LOCALE_KEY]}: {number}</div>}
      {rows.map(row => (
        <JetsRow key={row.id} seats={row.seats} />
      ))}
    </div>
  );
};
