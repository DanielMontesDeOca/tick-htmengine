const request = require('superagent');

class API {
  constructor(host) {
    if (!host) {
      throw new Error('Api host is required');
    }

    this.apiHost = host;
  }

  _post(endpoint, data) {
    return new Promise((resolve, reject) => {
      request
      .post(this.apiHost + endpoint)
      .send(data)
      .set('Accept', 'application/json')
      .end(function end(err, res) {
        if (err || res.status !== 200) {
          reject(err || res.body);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  _put(endpoint, data) {
    return new Promise((resolve, reject) => {
      request
      .put(this.apiHost + endpoint)
      .send(data)
      .set('Accept', 'application/json')
      .end(function end(err, res) {
        if (err || res.status !== 200) {
          reject(err || res.body);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  _delete(endpoint, data) {
    return new Promise((resolve, reject) => {
      request
      .delete(this.apiHost + endpoint)
      .send(data)
      .set('Accept', 'application/json')
      .end(function end(err, res) {
        if (err || res.status !== 200) {
          reject(err || res.body);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  _get(endpoint, data) {
    return new Promise((resolve, reject) => {
      request
      .get(this.apiHost + endpoint)
      .query(data)
      .set('Accept', 'application/json')
      .end(function end(err, res) {
        if (err || res.status !== 200) {
          reject(err || res.body);
        } else {
          resolve(res.body);
        }
      });
    });
  }
}

module.exports = API;
