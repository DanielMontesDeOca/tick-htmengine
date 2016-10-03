const API = require('../lib/api');
const {app} = require('../config');

class AppAPI extends API {
  constructor() {
    super(app.host);
  }

  postHTMData(data) {
    const {name} = data;

    return this._post(`/htm/${name}`, data);
  }

  getHTMData(data) {
    const {name} = data;

    return this._get(`/htm/${name}`);
  }

  getTwitterHashtag(data) {
    const {name} = data;

    return this._get(`/twitter/hashtags/${name}`);
  }
}

module.exports = new AppAPI();
