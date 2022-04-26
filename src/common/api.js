export class JetsApiService {
  constructor() {
    this._apiUrl = process.env.JETS_BASE_API_URL;
  }

  getData = async (url, options = {}) => {
    const response = await fetch(`${this._apiUrl}/${url}`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.error}`);
    }

    return await response.json();
  };

  postData = async (url, body, options = {}) => {
    const params = { ...options, method: 'post', body: JSON.stringify(body) };
    const path = `${this._apiUrl}/${url}`;
    const response = await fetch(path, params);

    return response.json();
  };

  getRequestOptions = token => {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  };
}
