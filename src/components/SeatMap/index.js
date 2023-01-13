import React, { useEffect, useRef, useState } from 'react';
import { JetsDeck } from '../Deck';
import { JetsSeatMapService } from './service';
import { JetsNoData } from '../NoData';
import { JetsNotInit } from '../NotInit';
import {
  DEFAULT_LANG,
  DEFAULT_SEAT_MAP_WIDTH,
  DEFAULT_UNITS,
  JetsContext,
  ENTITY_STATUS_MAP,
  ENTITY_TYPE_MAP,
} from '../../common';
import './index.css';

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
  const [params, setParams] = useState(null);
  const [exits, setExits] = useState([]);
  const [bulks, setBulks] = useState([]);

  const seatMapRef = useRef();

  const service = new JetsSeatMapService();

  useEffect(() => {
    let isMounted = true;

    if (flight?.id) {
      service.getSeatMapData(flight, availability, passengers, configuration).then(data => {
        if (isMounted) {
          setParams(data.params);
          setContent(data.content);
          setExits(data.exits);
          setBulks(data.bulks);
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

  const onSeatClick = (data, element, event) => {
    const notAvailable =
      data.type !== ENTITY_TYPE_MAP.seat ||
      (data.status !== ENTITY_STATUS_MAP.available && data.status !== ENTITY_STATUS_MAP.selected);

    if (notAvailable) return;

    const nextPassanger = service.getNextPassenger(passengersList);
    const tooltipData = service.calculateTooltipData(data, element.current, seatMapRef.current, params?.antiScale);

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

  const scaleTransformValue = `scale(${params?.scale})`;

  const scaleWrapStyle = {
    transform: scaleTransformValue,
    transformOrigin: 'top left',
    width: params?.innerWidth,
  };

  const providerValue = {
    onSeatClick,
    onTooltipClose,
    onSeatSelect,
    onSeatUnselect,
    isSelectAvailable,
    params,
    activeTooltip,
  };

  return (
    <JetsContext.Provider value={providerValue}>
      <div
        ref={seatMapRef}
        className="jets-seat-map"
        style={{
          width: configuration.width,
        }}
      >
        <div style={scaleWrapStyle}>
          {content?.length ? (
            content?.map((deck, index) => (
              <JetsDeck
                rows={deck}
                lang={configuration.lang}
                number={content.length > 1 && deck.length ? index + 1 : null}
                key={index}
                exits={exits[index]}
                bulks={bulks[index]}
              />
            ))
          ) : isSeatMapInited ? (
            <JetsNoData />
          ) : (
            <JetsNotInit />
          )}
        </div>
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
