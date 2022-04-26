import React, { useState } from 'react';
import { JetsButton } from '../Button';
import { JetsSeatMap } from '../SeatMap';
import './index.css';

// const FLIGHT_MOCK = {
//   id: '1111',
//   airlineCode: 'LH',
//   flightNo: '111',
//   departureDate: '2022-04-28',
//   departure: 'MUC',
//   arrival: 'FRA',
//   cabinClass: 'E',
//   passengerType: 'ADT',
//   planeCode: null,
// };

const FLIGHT_MOCK = {
  id: '1111',
  airlineCode: 'BA',
  flightNo: '106',
  departureDate: '2022-09-28',
  departure: 'DXB',
  arrival: 'LHR',
  cabinClass: 'E',
  passengerType: 'ADT',
  planeCode: null,
};

const AVAILABILITY_MOCK = [
  // {
  //   currency: 'USD',
  //   label: '*',
  //   price: 50,
  //   onlyForPassengerType: ['ADT', 'CHD'],
  // },
  {
    currency: 'USD',
    label: '20E',
    price: 33,
    onlyForPassengerType: ['ADT', 'CHD', 'INF'],
  },
  {
    currency: 'USD',
    label: '20K',
    price: 33,
    onlyForPassengerType: ['ADT', 'CHD', 'INF'],
  },
  {
    currency: 'USD',
    label: '21F',
    price: 13,
    onlyForPassengerType: ['ADT', 'CHD', 'INF'],
  },
  {
    currency: 'USD',
    label: '31B',
    price: 13,
    onlyForPassengerType: ['CHD', 'INF'],
  },
  {
    currency: 'USD',
    label: '35K',
    price: 1337,
    onlyForPassengerType: ['CHD', 'INF'],
  },
  {
    currency: 'EUR',
    label: '70E',
    price: 1488,
  },
];

const CONFIG_MOCK = {
  width: 500,
  lang: 'EN',
};

const PASSENGERS_MOCK = [
  {
    passengerType: 'ADT',
    id: '1',
    seat: null,
  },
  {
    id: '2',
    seat: {
      price: 0,
      seatLabel: '21F',
    },
    passengerLabel: 'Alex Test',
    passengerColor: 'brown',
  },
  {
    id: '4',
    seat: {
      price: 0,
      seatLabel: '21G',
    },
    passengerLabel: 'Big Lebowski',
    passengerColor: 'green',
  },
  {
    id: '3',
    passengerType: 'CHD',
    seat: null,
    passengerLabel: 'John Snow',
    passengerColor: 'orange',
  },
];

export const DemoComponent = () => {
  const [flight, setFlight] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [passengers, setPassengers] = useState(null);
  const [defaultFlight, setDefaultFlight] = useState(JSON.stringify(FLIGHT_MOCK, null, 2));
  const [defaultAvailability, setDefaultAvailability] = useState(JSON.stringify(AVAILABILITY_MOCK, null, 2));
  const [defaultPassengers, setDefaultPassengers] = useState(JSON.stringify(PASSENGERS_MOCK, null, 2));

  const onSetFlight = () => {
    setFlight(JSON.parse(defaultFlight));
  };

  const onSetAvailability = () => {
    setAvailability(JSON.parse(defaultAvailability));
  };

  const onSetPassengers = () => {
    setPassengers(JSON.parse(defaultPassengers));
  };

  const onFlightChange = e => {
    setDefaultFlight(e.target.value);
  };

  const onAvailabilityChange = e => {
    setDefaultAvailability(e.target.value);
  };

  const onPassengersChange = e => {
    setDefaultPassengers(e.target.value);
  };

  return (
    <div className="jets-demo">
      <div className="jets-demo--controllers">
        <div className="jets-demo--controller">
          <textarea onChange={e => onFlightChange(e)} defaultValue={defaultFlight} />
          <JetsButton className="jets-btn jets-demo--btn" content="INIT SEAT MAP" onClick={onSetFlight} />
        </div>
        <div className="jets-demo--controller">
          <textarea onChange={e => onAvailabilityChange(e)} defaultValue={defaultAvailability} />
          <JetsButton className="jets-btn jets-demo--btn" content="SET AVAILABILITY" onClick={onSetAvailability} />
        </div>
        <div className="jets-demo--controller">
          <textarea onChange={e => onPassengersChange(e)} defaultValue={defaultPassengers} />
          <JetsButton className="jets-btn jets-demo--btn" content="SET PASSENGERS" onClick={onSetPassengers} />
        </div>
      </div>
      <div className="jets-demo--seat-map">
        <JetsSeatMap flight={flight} config={CONFIG_MOCK} availability={availability} passengers={passengers} />
      </div>
    </div>
  );
};
