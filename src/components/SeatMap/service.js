import { DEFAULT_FEATURES_LIST, DEFAULT_TOOLTIP_WIDTH, SEAT_STATUS_MAP, SEAT_TYPE_MAP } from '../../common';
import { JetsSeatMapApiService } from './api';
import { JetsContentPreparer } from './preparer';

export class JetsSeatMapService {
  constructor() {
    this._api = new JetsSeatMapApiService();
    this._preparer = new JetsContentPreparer();
  }

  getSeatMapData = async (flight, availability, passengers, config) => {
    const { width, lang, units } = config;
    const data = { flights: [flight], featuresList: DEFAULT_FEATURES_LIST, lang, units };
    const response = await this._api.getPlaneFeatures(data);
    const activePassenger = passengers?.find(item => item.seat?.seatLabel);
    let content = this._preparer.prepareContent(response[0], config);

    if (availability) content = this.setAvailabilityHandler(content, availability);

    if (passengers && activePassenger) content = this.setPassengersHandler(content, passengers);

    return content;
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
    const { selected, available, unavailable } = SEAT_STATUS_MAP;
    const wildCard = availability?.find(item => item.label === '*');

    return content.map(deck => {
      return deck.map(row => {
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
          } else if (seat.type === SEAT_TYPE_MAP.seat) {
            seat['status'] = wildCard ? available : unavailable;
            seat['price'] = `${wildCard?.currency} ${wildCard?.price || 0}` || '';
            seat['passenger'] = null;
            seat['passengerTypes'] = wildCard?.onlyForPassengerType || ['ADT', 'CHD', 'INF'];
          }

          return seat;
        });

        return { ...row, seats };
      });
    });
  };

  setPassengersHandler = (content, passengers) => {
    const { selected, available, unavailable } = SEAT_STATUS_MAP;

    return content.map(deck => {
      return deck.map(row => {
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
    });
  };

  calculateTooltipData = (seatData, seatNode, seatMapNode) => {
    const { offsetTop: seatTop, offsetLeft: seatLeft } = seatNode
    const { width: seatMapWidth } = seatMapNode.getBoundingClientRect();
    const seatMapLeftBorder = 0;
    const isRightOverlapped = seatLeft + DEFAULT_TOOLTIP_WIDTH > seatMapWidth;
    const isLeftOverlapped = seatLeft - DEFAULT_TOOLTIP_WIDTH < seatMapLeftBorder;
    const top = seatTop + seatData.size / 2;
    const left = isRightOverlapped
      ? isLeftOverlapped
        ? seatMapWidth - seatMapWidth / 2 - DEFAULT_TOOLTIP_WIDTH / 2
        : seatLeft - DEFAULT_TOOLTIP_WIDTH + seatData.size / 2
      : seatLeft + seatData.size / 2;

    return { ...seatData, top, left };
  };

  getNextPassenger = passengers => {
    return passengers?.find(passenger => !passenger.seat?.seatLabel);
  };

  addAbbrToPassengers = (passengers) => {
    return passengers?.map((passenger, index) => {
      passenger['abbr'] = this._getPassengerAbbr(passenger, index + 1);
      return passenger;
    })
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
  }

  findPassengerBySeatNumber = (passengers, seatNumber) => {
    return passengers.find(passenger => passenger.seat?.seatLabel === seatNumber);
  };
}
