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
  THEME_DECK_LABEL_TITLE_COLOR,
  THEME_FLOOR_COLOR,
  THEME_SEAT_LABEL_COLOR,
  THEME_SEAT_STROKE_COLOR,
  THEME_SEAT_STROKE_WIDTH,
  THEME_SEAT_ARMREST_COLOR,
  THEME_DEFAULT_PASSENGER_BADGE_COLOR,
  THEME_DEFAULT_FONT_FAMILY,
  THEME_DECK_BODY_COLOR,
  THEME_DECK_BODY_WIDTH,
  THEME_TOOLTIP_BACKGROUND_COLOR,
  THEME_TOOLTIP_BORDER_COLOR,
  THEME_TOOLTIP_FONT_COLOR,
  THEME_TOOLTIP_ICON_COLOR,
  THEME_TOOLTIP_ICON_BORDER_COLOR,
  THEME_TOOLTIP_ICON_BACKGROUND_COLOR,
  THEME_TOOLTIP_HEADER_COLOR,
  THEME_TOOLTIP_SELECT_BUTTON_TEXT_COLOR,
  THEME_TOOLTIP_SELECT_BUTTON_BACKGROUND_COLOR,
  THEME_TOOLTIP_CANCEL_BUTTON_TEXT_COLOR,
  THEME_TOOLTIP_CANCEL_BUTTON_BACKGROUND_COLOR,
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
  const colorTheme = { ...JetsSeatMap.defaultProps.config.colorTheme, ...config.colorTheme };
  const [content, setContent] = useState([]);
  const [isSeatMapInited, setSeatMapInited] = useState(false);
  const [passengersList, setPassengersList] = useState([]);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isSelectAvailable, setSelectAvailable] = useState(false);
  const [params, setParams] = useState(null);

  const [exits, setExits] = useState([]);
  const [bulks, setBulks] = useState([]);

  const seatMapRef = useRef();
  const service = new JetsSeatMapService(configuration);

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
    height: params?.scaledTotalDecksHeight,
  };

  const providerValue = {
    onSeatClick,
    onTooltipClose,
    onSeatSelect,
    onSeatUnselect,
    isSelectAvailable,
    params,
    colorTheme,
    activeTooltip,
  };

  return (
    <JetsContext.Provider value={providerValue}>
      <div
        ref={seatMapRef}
        className="jets-seat-map"
        style={{
          width: configuration.width,
          height: params?.scaledTotalDecksHeight,
          fontFamily: colorTheme.fontFamily,
        }}
      >
        <div style={scaleWrapStyle}>
          {content?.length ? (
            content?.map((deck, index) => (
              <JetsDeck
                rows={deck.rows}
                lang={configuration.lang}
                number={index + 1}
                key={deck.uniqId}
                exits={exits[index]}
                bulks={bulks[index]}
                height={deck.height}
                width={deck.width}
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
    colorTheme: {
      deckLabelTitleColor: THEME_DECK_LABEL_TITLE_COLOR,
      floorColor: THEME_FLOOR_COLOR,
      seatLabelColor: THEME_SEAT_LABEL_COLOR,
      seatStrokeColor: THEME_SEAT_STROKE_COLOR,
      seatStrokeWidth: THEME_SEAT_STROKE_WIDTH,
      seatArmrestColor: THEME_SEAT_ARMREST_COLOR,

      defaultPassengerBadgeColor: THEME_DEFAULT_PASSENGER_BADGE_COLOR,
      fontFamily: THEME_DEFAULT_FONT_FAMILY,

      deckBodyColor: THEME_DECK_BODY_COLOR,
      deckBodyWidth: THEME_DECK_BODY_WIDTH,

      tooltipBackgroundColor: THEME_TOOLTIP_BACKGROUND_COLOR,
      tooltipHeaderColor: THEME_TOOLTIP_HEADER_COLOR,
      tooltipBorderColor: THEME_TOOLTIP_BORDER_COLOR,
      tooltipFontColor: THEME_TOOLTIP_FONT_COLOR,
      tooltipIconColor: THEME_TOOLTIP_ICON_COLOR,
      tooltipIconBorderColor: THEME_TOOLTIP_ICON_BORDER_COLOR,
      tooltipIconBackgroundColor: THEME_TOOLTIP_ICON_BACKGROUND_COLOR,
      tooltipSelectButtonTextColor: THEME_TOOLTIP_SELECT_BUTTON_TEXT_COLOR,
      tooltipSelectButtonBackgroundColor: THEME_TOOLTIP_SELECT_BUTTON_BACKGROUND_COLOR,
      tooltipCancelButtonTextColor: THEME_TOOLTIP_CANCEL_BUTTON_TEXT_COLOR,
      tooltipCancelButtonBackgroundColor: THEME_TOOLTIP_CANCEL_BUTTON_BACKGROUND_COLOR,
    },
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
