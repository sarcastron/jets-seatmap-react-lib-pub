import { JetsApiService } from '../../common/api';
import { DEFAULT_LANG, DEFAULT_UNITS } from '../../common';

const API_SUPPORTED_LANGUAGES = [
  'AR',
  'CN',
  'CS',
  'DA',
  'DE',
  'EN',
  'EL',
  'ES',
  'ET',
  'FR',
  'HE',
  'HU',
  'ID',
  'IT',
  'JA',
  'IW',
  'KO',
  'LT',
  'LV',
  'NL',
  'NO',
  'PL',
  'PT',
  'RO',
  'RU',
  'TR',
  'UK',
  'SV',
];

export class JetsSeatMapApiService extends JetsApiService {
  constructor(appId, key, url, localStorage = null) {
    super(appId, key, url, localStorage);
  }

  getPlaneFeatures = async (flight, lang = DEFAULT_LANG, units = DEFAULT_UNITS) => {
    const language = API_SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANG;

    const data = { flight, lang: language, units };

    const path = 'flight/features/plane/seatmap';
    const response = await this.postData(path, data);

    const planeFeatures = response.find(item => item.id === flight.id);

    if (!planeFeatures) {
      throw new Error(`plane features are not found for the flight: ${flight.id}`);
    }

    if (planeFeatures && planeFeatures.error) {
      throw new Error(planeFeatures.error);
    }

    if (planeFeatures && !planeFeatures.seatDetails) {
      throw new Error(`seat details are not found for the flight: ${flight.id}`);
    }

    return planeFeatures;
  };
}
