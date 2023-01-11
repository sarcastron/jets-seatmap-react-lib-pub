import { SEAT_SIZE_MAP, DEFAULT_DECK_TITLE_HEIGHT, DEFAULT_INDEX_ROW_HEIGHT } from '../../common';

export class JetsParamsCalculator {
  constructor() {}

  getSeatMapParams = (biggestRow, decks, config) => {
    const { size: biggestRowSize, classCode: biggestRowClassCode } = biggestRow;
    const innerWidth = this._calculateSeatMapInnerWidth(biggestRowSize, biggestRowClassCode) || config.width;
    const scaleCoefs = this._calculateSeatMapScale(innerWidth, config.width);
    const decksHeight = this._calculateDecksHeight(decks);

    return { ...scaleCoefs, innerWidth, decksHeight };
  };

  _calculateSeatMapScale = (innerWidth, outerWidth) => {
    const scale = outerWidth / innerWidth || 1;
    const antiScale = innerWidth / outerWidth || 1;

    return { scale, antiScale };
  };

  _calculateSeatMapInnerWidth = (length, classCode) => {
    return length * SEAT_SIZE_MAP[classCode]?.width;
  };

  _calculateDecksHeight = decks => {
    return decks?.map(({ rows, bulks }) => {
      if (!rows.length) return 0;

      const lastRow = rows.at(-1);
      const { topOffset, classCode, seats } = lastRow;
      const maxTopOffset = this._calculateRowMaxSeatTopOffset(seats);
      const { height: lastBulkHeight } = this._calculateLastBulkHeight(bulks);

      const preparedHeight = Math.round(
        topOffset +
          SEAT_SIZE_MAP[classCode].height +
          DEFAULT_DECK_TITLE_HEIGHT +
          DEFAULT_INDEX_ROW_HEIGHT +
          lastBulkHeight +
          maxTopOffset || 0
      );

      return preparedHeight;
    });
  };

  _calculateRowMaxSeatTopOffset = seats => {
    return seats?.reduce((acc, { topOffset }) => {
      if (topOffset > acc) acc = topOffset;

      return acc;
    }, 0);
  };

  _calculateLastBulkHeight = bulks => {
    const initialAcc = {
      topOffset: 0,
      height: 0,
    };

    return bulks?.reduce((acc, { topOffset, height }) => {
      if (topOffset > acc.topOffset) {
        acc.topOffset = topOffset;
        acc.height = height;
      }

      return acc;
    }, initialAcc);
  };
}
