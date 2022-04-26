import { JetsApiService } from '../../common/api';
import { JetsAuthService } from '../../common/auth';

export class JetsSeatMapApiService extends JetsApiService {
  constructor() {
    super();
    this._auth = new JetsAuthService();
  }

  getPlaneFeatures = async data => {
    const path = 'flight/features/plane';
    const token = await this._auth.getToken();
    const options = this.getRequestOptions(token);
    const response = await this.postData(path, data, options);
    return response;
  };
}
