const CONFIG_MOCK = {
  width: 400,
  lang: 'EN',
  apiUrl: process.env.JETS_BASE_API_URL,
  apiAppId: process.env.JETS_APP_ID,
  apiKey: process.env.JETS_PRIVATE_KEY,
  colorTheme: {
    deckLabelTitleColor: 'white',
    deckBodyColor: 'darkgrey',
    deckBodyWidth: 25,

    floorColor: 'rgb(30,60,90)',
    seatLabelColor: 'white',
    seatStrokeColor: 'rgb(237, 237, 237)',
    seatStrokeWidth: 1,
    seatArmrestColor: '#cccccc',

    defaultPassengerBadgeColor: 'darkred',
    fontFamily: 'Montserrat, sans-serif',

    tooltipBackgroundColor: 'rgb(255,255,255)',
    tooltipHeaderColor: '#4f6f8f',
    tooltipBorderColor: 'rgb(255,255,255)',
    tooltipFontColor: '#4f6f8f',
    tooltipIconColor: '#4f6f8f',
    tooltipIconBorderColor: '#4f6f8f',
    tooltipIconBackgroundColor: '#fff',
    tooltipSelectButtonTextColor: '#fff',
    tooltipSelectButtonBackgroundColor: 'rgb(42, 85, 128)',
    tooltipCancelButtonTextColor: '#fff',
    tooltipCancelButtonBackgroundColor: 'rgb(155, 0, 0)',
  },
};

export default CONFIG_MOCK;
