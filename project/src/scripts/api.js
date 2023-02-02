import { BASE_URL } from './config';

class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  makeRequest({ path, body, method = 'GET' }) {
    const config = {
      headers: this.headers,
      method,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    return fetch(`${this.baseUrl}${path}`, config)
      .then((res) => {
        const json = res.json();

        if (res.ok) {
          return json;
        }

        return json.then((data) => Promise.reject(data));
      });
  }

  getClients(searchQuery) {
    let path = '/api/clients';

    if (searchQuery) {
      path += `?search=${searchQuery}`;
    }

    return this.makeRequest({ path });
  }

  getClient(clientId) {
    const path = `/api/clients/${clientId}`;

    return this.makeRequest({ path });
  }

  postClient({
    name, surname, lastName, contacts,
  }) {
    const path = '/api/clients';
    return this.makeRequest({
      path,
      body: {
        name, surname, lastName, contacts,
      },
      method: 'POST',
    });
  }

  patchClient(clientId, {
    name, surname, lastName, contacts,
  }) {
    const path = `/api/client/${clientId}`;
    return this.makeRequest({
      path,
      body: {
        name, surname, lastName, contacts,
      },
      method: 'PATCH',
    });
  }

  deleteClient(clientId) {
    const path = `/api/client/${clientId}`;
    return this.makeRequest({
      path,
      method: 'DELETE',
    });
  }
}

export default new Api(BASE_URL, {
  'Content-Type': 'application/json',
});
