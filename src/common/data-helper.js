import { DEFAULT_DECK_PADDING_SIZE, THEME_DECK_BODY_WIDTH } from '.';

export class JetsDataHelper {
  constructor() {}

  getSeatMapParams = (decks, config) => {
    const decksWidths = decks.map(deck => deck.width);
    const maxDeckWidth = Math.max(...decksWidths);

    const scaleCoefs = this._calculateSeatMapScale(maxDeckWidth, config.width);

    const totalDecksHeight = decks.map(deck => deck.height).reduce((a, b) => a + b, 0);

    return {
      ...scaleCoefs,
      innerWidth: maxDeckWidth,
      totalDecksHeight,
      scaledTotalDecksHeight: totalDecksHeight ? `${totalDecksHeight * (scaleCoefs.scale || 1)}px` : '100%',
    };
  };

  getDeckInnerWidth(biggestRowWidth, config) {
    return biggestRowWidth + DEFAULT_DECK_PADDING_SIZE * 2 + THEME_DECK_BODY_WIDTH * 2 || config.width;
  }

  findWidestDeckRow = rows => {
    const sorted = [...rows]
      .filter(r => !!r.number)
      .sort((a, b) => {
        return b.width - a.width;
      });

    return sorted[0];
  };

  findBiggestDeckRow = rows => {
    const sorted = [...rows].sort((a, b) => {
      const seatsRegex = /S/g;
      const bSeatsCount = b.seatScheme.match(seatsRegex).length;
      const aSeatsCount = a.seatScheme.match(seatsRegex).length;
      return bSeatsCount - aSeatsCount;
    });

    return sorted[0];
  };

  _calculateSeatMapScale = (innerWidth, outerWidth) => {
    const scale = outerWidth / innerWidth || 1;
    const antiScale = innerWidth / outerWidth || 1;

    return { scale, antiScale };
  };

  _calculateDecksHeight = (decks, bulks, exits) => {
    return decks?.map((deck, deckIndex) => {
      const deckBulks = bulks[deckIndex];
      const deckExits = exits[deckIndex];
      return this.calculateDeckHeight(deck.rows, deckBulks, exits);
    });
  };

  calculateDeckHeight = (rows, deckBulks, deckExits) => {
    if (!rows.length) return 0;

    const lastRow = rows.at(-1);
    const { topOffset: lastRowTopOffset, seats: lastRowSeats } = lastRow;
    const lowestSeat = this._findLowestSeat(lastRowSeats);
    const { height: lastBulkHeight, topOffset: lastBulkTopOffset } = this._calculateLastElementHeight(deckBulks);

    const { height: lastExitHeight, topOffset: lastExitTopOffset } = this._calculateLastElementHeight(deckExits);

    const lowestSeatBoundary = lastRowTopOffset + lowestSeat.topOffset + lowestSeat.size.height;
    const lowestBulkBoundary = lastBulkTopOffset + lastBulkHeight;
    const lowestExitBoundary = lastExitTopOffset + lastExitHeight;

    const maxElementTopOffset = Math.max(lowestSeatBoundary, lowestBulkBoundary, lowestExitBoundary);
    const preparedHeight = Math.round(maxElementTopOffset);

    return preparedHeight;
  };

  _findLowestSeat = seats => {
    let lowest = {};
    let lowestBottomBoundary = 0;

    for (const seat of seats) {
      const { width, height } = seat.size;
      const seatBottomBoundary = seat.topOffset + height;
      if (lowestBottomBoundary < seatBottomBoundary) {
        lowestBottomBoundary = seatBottomBoundary;
        lowest = seat;
      }
    }

    return lowest;
  };

  _calculateLastElementHeight = elements => {
    const initialAcc = {
      topOffset: 0,
      height: 0,
    };

    return elements?.reduce((acc, { topOffset, height }) => {
      if (topOffset > acc.topOffset) {
        acc.topOffset = topOffset;
        acc.height = height || 150; //FIXME: exits without height ???
      }

      return acc;
    }, initialAcc);
  };
}
