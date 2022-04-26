# Seatmap integration and communication

This document describes how to integrate JetsSeatMap lib (further "seatmap") into any React.js application. Also,
communication between the seatmap and a parent layer that embeds seatmap (further just "parent layer").

&nbsp;

## Installation

First of all you need to `fork` this repository.

Install dependencies:

`npm i`

Rename _.env-sample_ to _.env_. Also you need to get the `APP_ID` and `PRIVATE_KEY` from Quicket GmbH support and put
them into fields in _.env_ file.

Run storybook:

`npm run dev`

By default you will see a loading progress bar - just input your flight parameters and press `INIT SEAT MAP`.

Now you can customize the source code of the library, first of all apply you CSS styles.

Before use, you have to build lib:

`npm run build-lib`

After that, you can publish library to new or already exisiting github repository, or publish it to your NPM account.

To connect the library to the project, you need to run:

`npm install name-of-your-lib-variation`

or include this string into your package.json dependencies if you use the github repo:

`"jets-seatmap-react-lib": "git+ssh://git@github.com/path-to-your-repo.git#branch"`

&nbsp;

## Integration

This section explains how to integrate seatmap into React.js application.

Embed seatmap into your component page via `<JetsSeatMap>` tag:

```jsx
<JetsSeatMap
  flight={flight_data}
  availability={availability_data}
  passengers={passengers_data}
  config={config_data}
  onSeatMapInited={seatMapInitedHandler}
  onSeatSelected={seatSelectedHandler}
  onSeatUnselected={seatUnselectedHandler}
/>
```

&nbsp;

## Properties

Seatmap is able to receive the following properties:

- [flight](#flight)
- [availability](#availability)
- [passengers](#passengers)
- [config](#config)
- [onSeatMapInited](#seat_map_inited)
- [onSeatSelected](#seat_selected)
- [onSeatUnselected](#seat_unselected)

The `flight` prop is requred.

&nbsp;

### <a name="flight"></a> Flight

This prop is required. It provides the data about cabin class, airline code, arrival, departure etc.

Interface, describing data types:

```typescript
interface IFlight {
  id: string;
  airlineCode: string;
  flightNo: string;
  departureDate: string;
  departure: string;
  arrival: string;
  cabinClass: string;
  passengerType: string;
  planeCode: number;
}
```

Example of data seatmap receives:

```javascript
{
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
```

The **departure** and **arrival** fields must consist the codes of airports. The **departureDate** field must be in
`yyyy-mm-dd` format.

&nbsp;

### <a name="availability"></a> Availability

The availability property is array of objects and describes which seats are able for passengers. You can pass it
asynchronously or not pass at all.

Interface, describing data types:

```typescript
interface IIncomingSeat {
  currency: string;
  label: string;
  price: number;
  onlyForPassengerType?: TPassengerType[];
}

type TSeatAvailability = IIncomingSeat[];
```

Example of data seatmap receives:

```javascript
[
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
    onlyForPassengerType: 'ADT',
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
];
```

You can pass seat with `label` **"\*"**. This label work like **all** selector for seats. In example below all seats
with `classCode` equals **"E"** will be enabled with `price` of _50_. However next seat configuration **"12F"** will
override `price` and set it to _75_. You can pass seat with `price` **0**. Also you can pass seat without `price` field
and it would be the same as pass it with **0** value.

If `onlyForPassengerType` field is empty or doesn't exist, then it has no restrictions value by default.

&nbsp;

### <a name="passengers"></a> Passengers

The passengers property is array of objects and describes the passengers for seating according to the cabin map . You
can pass it asynchronously or not pass at all.

Interface, describing data types:

```typescript
interface IPassenger {
  readonly id: string;
  seat: ISeat;
  passengerType?: TPassengerType;
  passengerLabel?: string;
  passengerColor?: string;
}

interface ISeat {
  price: number;
  seatLabel: string;
}

type TAllocatablePassengers = IPassenger[];

type TPassengerType = 'ADT' | 'CHD' | 'INF';
```

Example of data seatmap receives:

```javascript
[
      {
        "id": "1",
        "seat": null
      },
      {
        "id": "2",
        "seat": {
          "price": 0,
          "seatLabel": "12F"
        }
        "passengerLabel": "Alex",
        "passengerColor": "brown",
      },
      {
        "id": "3",
        "passengerType": "CHD",
        "seat": null
        "passengerLabel": "John Snow",
        "passengerColor": "#ccc",
      }
    ]
```

Or even like this:

```javascript
{
  "data": {
    "passengers": [
      { "id": "1" },
      { "id": "2" },
      { "id": "3" }
    ]
  },
  "type": "SYNC_PASSENGERS"
}
```

`seat`, `passengerType`, `passengerLabel` and `passengerColor` are not required fields.

If you will not pass `passengerType`, `passengerLabel` and `passengerColor` fields the values will be set by default.

Please notice, that seatmap identifies how many passengers to allocate by a length of `passengers` array. Therefore, for
example, to allocate 2 passengers without any predefined seat or its type, `passengers` array shall contain 2 items.

&nbsp;

### <a name="config"></a> Config

The config property describes basic configuration of seat map.

Interface, describing data types:

```typescript
interface IConfig {
  width: number;
  lang: string;
  units: TUnit;
}

type TUnit = 'metric' | 'imperials';

type TLang = 'EN' | 'RU' | 'CN';
```

Example of data seatmap receives:

```javascript
width: 430;
lang: 'RU';
units: 'metric';
```

By default config looks like:

```javascript
width: 300;
lang: 'EN';
units: 'metric';
```

If you will not pass the config param or any config fields then the properties will be set with default values.

&nbsp;

### <a name="seat_map_inited"></a> onSeatMapInited

This event fires up when seatmap (DOM tree, content) is initialized.

&nbsp;

### <a name="seat_selected"></a> onSeatSelected

This event fires up when seat is selected. It provides the array of passengers with seat occupancy data.

Interface, describing data types:

```typescript
interface IPassenger {
  readonly id: string;
  seat: ISeat;
  passengerType?: TPassengerType;
  passengerLabel?: string;
  passengerColor?: string;
}

interface ISeat {
  price: number;
  seatLabel: string;
}
```

&nbsp;

### <a name="seat_unselected"></a> onSeatUnselected

This event fires up when seat is unselected. It provides the array of passengers with seat occupancy data.

```typescript
interface IPassenger {
  readonly id: string;
  seat: ISeat;
  passengerType?: TPassengerType;
  passengerLabel?: string;
  passengerColor?: string;
}

interface ISeat {
  price: number;
  seatLabel: string;
}
```
