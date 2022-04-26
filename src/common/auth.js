import { JetsApiService } from './api';
import { JetsLocalStorageService } from './localStorage';

const JWT_TOKEN = 'jetsJwtToken';
const TOKEN_EXPIRATION_BUFFER_IN_MS = 300000;
const AUTH_REQUEST_OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env.JETS_PRIVATE_KEY}`,
  },
};

export class JetsAuthService {
  constructor() {
    this._localStorage = new JetsLocalStorageService();
    this._api = new JetsApiService();
  }

  getToken = async () => {
    const token = this._localStorage.getData(JWT_TOKEN);

    if (token) return token;

    const path = `auth?appId=${process.env.JETS_APP_ID}`;
    const { accessToken } = await this._api.getData(path, AUTH_REQUEST_OPTIONS);

    if (!accessToken) {
      throw Error;
    }

    this._saveToken(accessToken);

    return accessToken;
  };

  _saveToken = token => {
    if (!token) return;

    const { exp } = this._parseJwt(token);
    const tokenTTL = this._getTokenTTL(exp);
    this._localStorage.setData(JWT_TOKEN, token, tokenTTL);
  };

  _getTokenTTL(exp) {
    return exp * 1000 - Date.now() - TOKEN_EXPIRATION_BUFFER_IN_MS;
  }

  _parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
}
