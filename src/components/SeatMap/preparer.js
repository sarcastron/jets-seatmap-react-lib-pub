import {
  CLASS_CODE_MAP,
  DEFAULT_SEAT_MARGIN,
  JetsUtils as Utils,
  LOCALES_MAP,
  SEAT_SCHEME_MAP,
  SEAT_STATUS_MAP,
  SEAT_TYPE_MAP,
} from '../../common';

export class JetsContentPreparer {
  constructor() {}

  prepareContent = (content, config) => {
    if (!content) return [];

    const { cabin, seatDetails } = content;
    const decks = seatDetails?.decks;
    const biggestRowSize = this._getBiggestRowSize(decks);

    const preparedContent =
      decks?.map(({ rows }) => {
        const options = { config, seatsNumber: biggestRowSize };

        return this._getPreparedRows(rows, cabin, options);
      }) || [];

    return preparedContent;
  };

  _getPreparedRows = (rows, cabin, options) => {
    if (!rows?.length) return [];

    const biggestDeckRow = this._getBiggestDeckRow(rows);
    const prepared = rows.map(row => this._prepareRow(row, cabin, options));

    const preparedBiggestDeckRow = this._prepareRow(biggestDeckRow, cabin, options);
    const indexRow = this._prepareIndexRow(preparedBiggestDeckRow);

    return [indexRow, ...prepared];
  };

  _prepareRow = (row, cabin, options) => {
    const id = Utils.generateId();
    const preparedSeats = this._getPreparedSeats(row, cabin, options);

    return { seats: preparedSeats, id, number: row.number };
  };

  _getPreparedSeats = (row, cabin, options) => {
    const { number, seatScheme, seats } = row;

    if (!seats?.length) return [];

    let counter = 0;
    const splitted = seatScheme.split('');

    const result = splitted.reduce((acc, item) => {
      const { seat, aisle, empty } = SEAT_SCHEME_MAP;
      let element = this._prepareSeat(seats[counter], row, cabin, options.config);

      if (item === aisle) element = this._prepareAisle(number);

      if (item === empty) element = this._prepareEmpty();

      if (item === seat) counter++;

      element['size'] = this._calculateSeatSize(options);
      element['id'] = Utils.generateId();

      acc.push(element);

      return acc;
    }, []);

    return result;
  };

  _prepareIndexRow = row => {
    const { index, aisle, empty } = SEAT_TYPE_MAP;
    const seats = row.seats.map(element => {
      element.letter = element.type === aisle ? '' : element.letter;
      element.type = element.type === aisle ? empty : index;
      element.status = SEAT_STATUS_MAP.disabled;
      element.number = '';

      return element;
    });

    return { ...row, number: '', seats };
  };

  _prepareSeat = (seat, row, cabin, config) => {
    const { number, classCode, name: rowName } = row;
    const features = this._prepareSeatFeatures(seat, cabin, config.lang);
    const classType = CLASS_CODE_MAP[classCode.toLowerCase()] || '';
    const seatNumber = number + seat?.letter || '';
    const type = SEAT_TYPE_MAP.seat;
    const status = SEAT_STATUS_MAP.available;

    return { ...seat, features, status, type, number: seatNumber, classType, rowName };
  };

  _prepareAisle = number => {
    const type = SEAT_TYPE_MAP.aisle;
    const status = SEAT_STATUS_MAP.disabled;

    return { letter: number, type, status };
  };

  _prepareEmpty = () => {
    const type = SEAT_TYPE_MAP.empty;
    const status = SEAT_STATUS_MAP.disabled;

    return { letter: '', status, type };
  };

  _calculateSeatSize = ({ seatsNumber, config }) => {
    const seatMargin = DEFAULT_SEAT_MARGIN * 2;
    const size = config.width / seatsNumber;

    return size - seatMargin;
  };

  _getBiggestDeckRow = rows => {
    const sorted = [...rows].sort((a, b) => b.seats.length - a.seats.length);

    return sorted[0];
  };

  _getBiggestRowSize = decks => {
    let totalBiggest = 0;

    decks?.forEach(({ rows }) => {
      const found = this._getBiggestDeckRow(rows);
      const deckBiggest = found?.seatScheme?.length;

      if (deckBiggest > totalBiggest) totalBiggest = deckBiggest;
    });

    return totalBiggest;
  };

  _prepareSeatFeatures = (seat, cabin, lang) => {
    const { pitch, width, recline } = cabin;
    const features = { ...seat?.features, pitch, width, recline };

    return Object.entries(features).map(([key, value]) => {
      const title = LOCALES_MAP[lang][key] || key;
      const isWifi = key === 'wifi_enabled' || key === 'wifiEnabled';
      let icon = this._getFeatureIcon(value);

      if (isWifi) icon = this._getFeatureIcon('wifi');

      return { title, icon, value };
    });
  };

  _getFeatureIcon = value => {
    let icon = '';

    if (value === '+') icon = 'plus.svg';

    if (value === '-') icon = 'minus.svg';

    if (value === 'wifi') icon = 'wifi.svg';

    return icon;
  };
}
