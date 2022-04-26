import React, { useEffect, useRef, useState } from 'react';
import { JetsDeck } from '../Deck';
import { JetsSeatMapService } from './service';
import { JetsNoData } from '../NoData';
import {
  DEFAULT_LANG,
  DEFAULT_SEAT_MAP_WIDTH,
  DEFAULT_UNITS,
  JetsContext,
  SEAT_STATUS_MAP,
  SEAT_TYPE_MAP,
} from '../../common';
import { JetsTooltip } from '../Tooltip';
import './index.css';
import { JetsNotInit } from '../NotInit';

export const JetsSeatMap = ({
  flight,
  availability,
  passengers,
  config,
  onSeatMapInited,
  onSeatSelected,
  onSeatUnselected,
}) => {
  const configuration = { ...JetsSeatMap.defaultProps.config, ...config };
  const [content, setContent] = useState([]);
  const [isSeatMapInited, setSeatMapInited] = useState(false);
  const [passengersList, setPassengersList] = useState([]);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isSelectAvailable, setSelectAvailable] = useState(false);

  const seatMapRef = useRef();

  const service = new JetsSeatMapService();

  useEffect(() => {
    let isMounted = true;

    if (flight?.id) {
      service.getSeatMapData(flight, availability, passengers, configuration).then(info => {
        if (isMounted) {
          setContent(info);
          setSeatMapInited(true);
          onSeatMapInited();
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [flight]);

  useEffect(() => {
    const data = service.setAvailabilityHandler(content, availability);
    setPassengers();
    setContent(data);
    setActiveTooltip(null);
  }, [availability]);

  useEffect(() => {
    setPassengers();
    setActiveTooltip(null);
  }, [passengers]);

  const setPassengers = () => {
    passengers = service.addAbbrToPassengers(passengers);

    const data = service.setPassengersHandler(content, passengers || []);

    setContent(data);
    setPassengersList(passengers);
  };

  const onSeatClick = (data, element) => {
    const notAvailable =
      data.type !== SEAT_TYPE_MAP.seat ||
      (data.status !== SEAT_STATUS_MAP.available && data.status !== SEAT_STATUS_MAP.selected);

    if (notAvailable) return;

    const nextPassanger = service.getNextPassenger(passengersList);
    const tooltipData = service.calculateTooltipData(data, element.current, seatMapRef.current);

    setSelectAvailable(!!nextPassanger);
    setActiveTooltip({ ...tooltipData, nextPassanger, lang: configuration.lang });
  };

  const onSeatSelect = seat => {
    const { data, passengers: newPassangers } = service.selectSeatHandler(content, seat, passengersList);

    setContent(data);
    setPassengersList(newPassangers);
    setActiveTooltip(null);

    onSeatSelected(newPassangers);
  };

  const onSeatUnselect = seat => {
    const { data, passengers: newPassangers } = service.unselectSeatHandler(content, seat, passengersList);

    setContent(data);
    setPassengersList(newPassangers);
    setActiveTooltip(null);

    onSeatUnselected(newPassangers);
  };

  const onTooltipClose = () => {
    setActiveTooltip(null);
  };

  return (
    <JetsContext.Provider value={{ onSeatClick, onTooltipClose, onSeatSelect, onSeatUnselect, isSelectAvailable }}>
      <div ref={seatMapRef} className="jets-seat-map" style={{ width: configuration.width }}>
        {activeTooltip && <JetsTooltip data={activeTooltip} />}
        {content.length ? (
          content.map((deck, index) => (
            <JetsDeck rows={deck} lang={configuration.lang} number={content.length > 1 && deck.length ? index + 1 : null} key={index} />
          ))
        ) : isSeatMapInited ? (
          <JetsNoData />
        ) : (
          <JetsNotInit />
        )}
      </div>
    </JetsContext.Provider>
  );
};

JetsSeatMap.defaultProps = {
  config: {
    width: DEFAULT_SEAT_MAP_WIDTH,
    lang: DEFAULT_LANG,
    units: DEFAULT_UNITS,
  },
  onSeatMapInited: () => {
    console.log('JetsSeatMap initialized!');
  },
  onSeatSelected: passenger => {
    console.log('Passenger boarded: ', passenger);
  },
  onSeatUnselected: passenger => {
    console.log('Passenger unboarded: ', passenger);
  },
};
