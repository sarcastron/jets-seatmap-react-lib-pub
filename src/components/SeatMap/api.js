import { JetsApiService } from '../../common/api';
import { DEFAULT_FEATURES_LIST, DEFAULT_LANG, DEFAULT_UNITS } from '../../common';

const API_SUPPORTED_LANGUAGES = ['EN', 'DE', 'RU', 'CN', 'ES', 'FR', 'IT', 'NO', 'DA', 'SV', 'PL'];

export class JetsSeatMapApiService extends JetsApiService {
  constructor(appId, key, url, localStorage = null) {
    super(appId, key, url, localStorage);
  }

  getPlaneFeatures = async (
    flight,
    featuresList = DEFAULT_FEATURES_LIST,
    lang = DEFAULT_LANG,
    units = DEFAULT_UNITS
  ) => {
    const language = API_SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANG;

    const data = { flights: [flight], featuresList, lang: language, units };

    const path = 'flight/features/plane';
    const response = await this.postData(path, data);

    const planeFeatures = response.find(item => item.id === flight.id);

    if (!planeFeatures) {
      throw new Error(`plane features are not found for the flight: ${flight.id}`);
    }

    if (planeFeatures && planeFeatures.error) {
      throw new Error(planeFeatures.error);
    }

    return planeFeatures;
  };
}
