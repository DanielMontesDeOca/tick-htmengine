const request = require('request');
const _ = require('lodash');
const config = require('../config/htmengine');

class HtmEngineClient {
  constructor(url) {
    this.url = url;
  }

  /**
   * Post data to a model.
   * @param id [string] model id
   * @param value [float] model value
   * @param timestamp [integer] UNIX timestamp associated with value
   */
  postData(id, value, timestamp) {
    return new Promise((resolve, reject) => {
      const url = this.url + '/' + id;
      const body = value + ' ' + timestamp;

      request.post(url, {body}, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  }

  /**
   * Creates a new model with specified id, min, and max values. If model exists,
   * command is ignored.
   * @param id [string] model id
   * @param min [float] min value for input data
   * @param max [float] max value for input data
   */
  createModel(id, min, max) {
    return new Promise((resolve, reject) => {
      const url = this.url + '/' + id;
      const data = {
        url,
        method: 'PUT',
        json: {
          min,
          max
        }
      };

      request(url, data, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  }

  /**
   * Gets ALL the data for specified model.
   * @param id [string] model id
   */
  getData(id) {
    return new Promise((resolve, reject) => {
      const url = this.url + '/' + id;

      request.get(url, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        if (!body) {
          return resolve([]);
        }

        const rows = _.compact(_.map(_.trim(body).split('\n'), (rowString) => {
          const pieces = rowString.split(/\s+/);
          const value = Number(pieces[1]);
          const timestamp = parseInt(pieces[2]);
          let anomalyScore = pieces[3];

          if (!value && !timestamp) {
            return null;
          }

          if (anomalyScore === 'None') {
            anomalyScore = undefined;
          } else {
            anomalyScore = Number(anomalyScore);
          }

          return {
            value,
            timestamp,
            anomalyScore
          };
        }));

        return resolve(rows);
      });
    });
  }

  /**
   * Returns the timestamp for the last data point given a model id.
   * @param id
   */
  getLastUpdated(id) {
    return this.getData(id)
      .then(data => data.length ? data[data.length - 1].timestamp : null);
  }
}

module.exports = new HtmEngineClient(config.url);
