import {
  DEFAULT_FEATURES_LIST,
  DEFAULT_TOOLTIP_WIDTH,
  ENTITY_STATUS_MAP,
  ENTITY_TYPE_MAP,
  JetsLocalStorageService,
} from '../../common';
import { JetsSeatMapApiService } from './api';
import { JetsContentPreparer } from '../../common/data-preparer';

export class JetsSeatMapService {
  constructor(configuration) {
    const { apiUrl, apiAppId, apiKey } = configuration;
    const localStorage = new JetsLocalStorageService();
    this._api = new JetsSeatMapApiService(apiAppId, apiKey, apiUrl, localStorage);
    this._preparer = new JetsContentPreparer();
  }

  getSeatMapData = async (flight, availability, passengers, config) => {
    const { lang, units } = config;
    const planeFeatures = await this._api.getPlaneFeatures(flight, DEFAULT_FEATURES_LIST, lang, units).catch(err => {
      console.error(`getSeatMapData ${err}`);
      return null;
    });

    let { content, params, exits, bulks } = this._preparer.prepareData(planeFeatures, config);

    if (availability) content = this.setAvailabilityHandler(content, availability);

    const activePassenger = passengers?.find(item => item.seat?.seatLabel);
    if (passengers && activePassenger) content = this.setPassengersHandler(content, passengers);

    return { content, params, exits, bulks };
  };

  selectSeatHandler = (content, seat, passengersList) => {
    const nextPassenger = this.getNextPassenger(passengersList);
    const passengers = passengersList.map(passenger => {
      if (nextPassenger.id === passenger.id) {
        const data = {
          price: seat['price'],
          seatLabel: seat['number'],
        };
        passenger['seat'] = data;
      }

      return passenger;
    });

    const data = this.setPassengersHandler(content, passengers);

    return { data, passengers };
  };

  unselectSeatHandler = (content, seat, passengersList) => {
    const passengers = passengersList.map(passenger => {
      if (seat.passenger?.id === passenger.id) {
        passenger['seat'] = null;
      }

      return passenger;
    });

    const data = this.setPassengersHandler(content, passengers);

    return { data, passengers };
  };

  setAvailabilityHandler = (content, availability) => {
    const { selected, available, unavailable } = ENTITY_STATUS_MAP;
    const wildCard = availability?.find(item => item.label === '*');

    return (
      content &&
      content.map(deck => {
        const rows = deck.rows.map(row => {
          const seats = row.seats.map(seat => {
            const found = availability.find(item => {
              return item.label === seat.number;
            });

            if (found) {
              const { price, currency } = found;
              seat['status'] = seat['status'] === selected ? selected : available;
              seat['price'] = `${currency} ${price || 0}` || '';
              seat['passengerTypes'] = found.onlyForPassengerType ||
                wildCard?.onlyForPassengerType || ['ADT', 'CHD', 'INF'];
            } else if (seat.type === ENTITY_TYPE_MAP.seat) {
              seat['status'] = wildCard ? available : unavailable;
              seat['price'] = `${wildCard?.currency} ${wildCard?.price || 0}` || '';
              seat['passenger'] = null;
              seat['passengerTypes'] = wildCard?.onlyForPassengerType || ['ADT', 'CHD', 'INF'];
            }

            return seat;
          });

          return { ...row, seats };
        });

        return { ...deck, rows };
      })
    );
  };

  setPassengersHandler = (content, passengers) => {
    const { selected, available, unavailable } = ENTITY_STATUS_MAP;

    return content.map(deck => {
      const rows = deck.rows.map(row => {
        const seats = row.seats.map(seat => {
          const found = passengers.find(passenger => seat.number && passenger?.seat?.seatLabel === seat.number);

          if (found && seat.status === available) {
            seat['status'] = selected;
            seat['price'] = found.seat?.price || seat['price'];
            seat['passenger'] = found;
          }

          if (found && seat.status === unavailable) {
            found['seat'] = null;
          }

          if (!found && seat.status === selected) {
            seat['status'] = available;
            seat['passenger'] = null;
          }

          return seat;
        });

        return { ...row, seats };
      });

      return { ...deck, rows };
    });
  };

  calculateTooltipData = (seatData, seatNode, seatMapNode, antiScale) => {
    const { offsetTop: seatTop, offsetLeft: seatLeft, clientWidth: seatWidth } = seatNode;
    const { width, height } = seatMapNode.getBoundingClientRect();

    const seatMapWidth = width * antiScale;
    const seatMapLeftBorder = 0;

    const widthPercent = 0.95;
    const tooltipWidth = `${100 / antiScale}%`;

    const isRightOverlapped = seatLeft + tooltipWidth > seatMapWidth;
    const isLeftOverlapped = seatLeft - tooltipWidth < seatMapLeftBorder;
    const top = seatTop + seatData.size.height / 2;

    const left = 0;

    const transformOrigin = 'top left';
    const pointerOffset = seatLeft + seatWidth * 0.5;

    return {
      ...seatData,
      top,
      left,
      transformOrigin,
      antiScale,
      width: tooltipWidth,
      seatmapHeight: height,
      pointerOffset,
    };
  };

  getNextPassenger = passengers => {
    return passengers?.find(passenger => !passenger.seat?.seatLabel);
  };

  addAbbrToPassengers = passengers => {
    return passengers?.map((passenger, index) => {
      passenger['abbr'] = this._getPassengerAbbr(passenger, index + 1);
      return passenger;
    });
  };

  _getPassengerAbbr = (passenger, index) => {
    const { passengerLabel } = passenger;

    if (!passengerLabel) {
      return `P${index}`;
    }

    const label = passengerLabel?.split(' ');
    const abbr =
      label.length > 1
        ? label
            .slice(0, 2)
            .map(n => n[0])
            .join('')
        : passengerLabel.substring(0, 2).toUpperCase();

    return abbr;
  };

  findPassengerBySeatNumber = (passengers, seatNumber) => {
    return passengers.find(passenger => passenger.seat?.seatLabel === seatNumber);
  };
}
