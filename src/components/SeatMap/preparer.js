import { JetsParamsCalculator } from './calculator';
import {
  CLASS_CODE_MAP,
  JetsUtils as Utils,
  LOCALES_MAP,
  ENTITY_SCHEME_MAP,
  ENTITY_STATUS_MAP,
  ENTITY_TYPE_MAP,
  SEAT_SIZE_MAP,
  DEFAULT_SEAT_SIZE,
  DEFAULT_SEAT_CLASS,
  DEFAULT_DECK_TITLE_HEIGHT,
  DEFAULT_INDEX_ROW_HEIGHT,
} from '../../common';

const DEFAULT_INDEX_ROW_SEAT_TOP_OFFSET = 50;
const DEFAULT_INDEX_ROW_SEAT_HEIGHT = 50;

const SEAT_FEATURES_ICONS = {
  '+': 'plus.svg',
  '-': 'minus.svg',
  wifi: 'wifi.svg',
  wifi_enabled: 'wifi.svg',
  wifiEnabled: 'wifi.svg',
  power: 'power.svg',
  audioVideo: 'audio-video.svg',
};

export class JetsContentPreparer {
  _calculator = null;

  constructor() {
    this._calculator = new JetsParamsCalculator();
  }

  prepareData = (content, config) => {
    if (!content) return [];

    const { cabin, seatDetails, entertainment, power, wifi } = content;
    const decks = seatDetails?.decks;
    const biggestRow = this._getBiggestRowInfo(decks);
    const params = this._calculator.getSeatMapParams(biggestRow, decks, config);

    const isDecksExist = decks && decks.length;
    const mergedCabinFeatures = this._mergeCabinFeatures(cabin, entertainment, power, wifi);

    const preparedContent =
      decks?.map(({ rows }) => {
        const options = { config, seatsNumber: biggestRow.size };

        return this._getPreparedRows(rows, mergedCabinFeatures, options);
      }) || [];

    const preparedExits = isDecksExist ? this._getPreparedExits(decks) : [];
    const preparedBulks = isDecksExist ? this._getPreparedBulks(decks) : [];

    return {
      content: preparedContent,
      params,
      exits: preparedExits,
      bulks: preparedBulks,
    };
  };

  _mergeCabinFeatures(cabin, entertainment, power, wifi) {
    const merged = { ...cabin };

    if (entertainment.exists && entertainment.summary) {
      merged['audioVideo'] = entertainment.summary;
    }

    if (power.exists && power.summary) {
      merged['power'] = power.summary;
    }

    if (wifi.exists && wifi.summary) {
      merged['wifi'] = wifi.summary;
    }

    return merged;
  }

  _getPreparedExits(decks) {
    return this._updateDeckItemsTopOffset(decks, 'exits');
  }

  _getPreparedBulks(decks) {
    return this._updateDeckItemsTopOffset(decks, 'bulks');
  }

  _updateDeckItemsTopOffset(decks, itemsName) {
    return decks.map(deck => {
      return deck[itemsName].map(deckItem => {
        const updatedItem = { ...deckItem };
        const updatedTopOffset = updatedItem.topOffset + DEFAULT_DECK_TITLE_HEIGHT + DEFAULT_INDEX_ROW_HEIGHT;

        updatedItem.topOffset = updatedTopOffset;

        return updatedItem;
      });
    });
  }

  _getPreparedRows = (rows, cabin, options) => {
    if (!rows?.length) return [];

    const biggestDeckRow = this._getBiggestDeckRow(rows);
    const prepared = rows.map(row => this._prepareRow(row, cabin, options));

    const preparedBiggestDeckRow = this._prepareRow(biggestDeckRow, cabin, options);
    const indexRow = this._prepareIndexRow(preparedBiggestDeckRow);

    return [indexRow, ...prepared];
  };

  _prepareRow = (row, cabin, options) => {
    const { number, topOffset } = row;
    const id = Utils.generateId();
    const preparedSeats = this._getPreparedSeats(row, cabin, options);
    const _topOffset = topOffset + DEFAULT_DECK_TITLE_HEIGHT + DEFAULT_INDEX_ROW_HEIGHT;

    return { seats: preparedSeats, id, number, topOffset: _topOffset };
  };

  _getPreparedSeats = (row, cabin, options) => {
    const { number, seatScheme, seats, classCode } = row;

    if (!seats?.length) return [];

    let counter = 0;
    const splitted = seatScheme.split('');

    const result = splitted.reduce((acc, item) => {
      const { seat, aisle, empty } = ENTITY_SCHEME_MAP;
      let element = this._prepareSeat(seats[counter], row, cabin, options.config);

      if (item === aisle) element = this._prepareAisle(number);

      if (item === empty) element = this._prepareEmpty();

      if (item === seat) counter++;

      element['size'] = this._calculateSeatSize(classCode);
      element['id'] = Utils.generateId();

      acc.push(element);

      return acc;
    }, []);

    return result;
  };

  _prepareIndexRow = row => {
    const { index, aisle, empty } = ENTITY_TYPE_MAP;
    const seats = row.seats.map(element => {
      element.letter = element.type === aisle ? '' : element.letter;
      element.type = element.type === aisle ? empty : index;
      element.status = ENTITY_STATUS_MAP.disabled;
      element.topOffset = DEFAULT_INDEX_ROW_SEAT_TOP_OFFSET;
      element.number = '';
      element.size = {
        width: element.size.width,
        height: DEFAULT_INDEX_ROW_SEAT_HEIGHT,
      };

      return element;
    });

    return { ...row, number: '', seats, topOffset: 0 };
  };

  _prepareSeat = (seat, row, cabin, config) => {
    const { number, classCode, name: rowName, seatType: _seatType } = row;
    const features = this._prepareSeatFeatures(seat, cabin, config.lang);
    const classType = CLASS_CODE_MAP[classCode.toLowerCase()] || '';
    const seatNumber = number + seat?.letter || '';
    const type = ENTITY_TYPE_MAP.seat;
    const status = ENTITY_STATUS_MAP.available;
    const seatType = `${classCode}-${_seatType}`;

    return { ...seat, features, status, type, number: seatNumber, classType, classCode, rowName, seatType };
  };

  _prepareAisle = number => {
    const type = ENTITY_TYPE_MAP.aisle;
    const status = ENTITY_STATUS_MAP.disabled;

    return { letter: number, type, status };
  };

  _prepareEmpty = () => {
    const type = ENTITY_TYPE_MAP.empty;
    const status = ENTITY_STATUS_MAP.disabled;

    return { letter: '', status, type };
  };

  _calculateSeatSize = classCode => {
    if (!classCode || !SEAT_SIZE_MAP[classCode]) return DEFAULT_SEAT_SIZE;

    return SEAT_SIZE_MAP[classCode];
  };

  _getBiggestDeckRow = rows => {
    const sorted = [...rows].sort((a, b) => {
      const seatsRegex = /S/g;
      const bSeatsCount = b.seatScheme.match(seatsRegex).length;
      const aSeatsCount = a.seatScheme.match(seatsRegex).length;
      return bSeatsCount - aSeatsCount;
    });

    return sorted[0];
  };

  _getBiggestRowInfo = decks => {
    let totalBiggest = 0;
    let biggestRowClassCode;

    decks?.forEach(({ rows }) => {
      const found = this._getBiggestDeckRow(rows);
      const deckBiggest = found?.seatScheme?.length;

      if (deckBiggest > totalBiggest) {
        totalBiggest = deckBiggest;
        biggestRowClassCode = found.classCode || DEFAULT_SEAT_CLASS;
      }
    });

    return { size: totalBiggest, classCode: biggestRowClassCode };
  };

  _prepareSeatFeatures = (seat, cabin, lang) => {
    const { pitch, width, recline, audioVideo, power, wifi } = cabin;
    const features = { pitch, width, recline, audioVideo, power, wifi, ...seat?.features };

    const prosOrCons = ['+', '-'];

    const prepared = Object.entries(features).map(([key, value]) => {
      const localized = LOCALES_MAP[lang][key] || key;
      if (prosOrCons.includes(value)) {
        // swap key-value for pros-cons features
        const icon = SEAT_FEATURES_ICONS[value] || '';

        return { title: null, icon, value: localized };
      } else {
        const icon = SEAT_FEATURES_ICONS[key] || '';

        return { title: localized, icon, value };
      }
    });

    return prepared;
  };

  _prepareSeatFeature = (key, value, lang) => {};
}
