class ElasticSearchStore {
  constructor() {
    this.client = require('../lib/elasticsearch');
  }

  getTwitterHashtagCount(tag) {
    return this.client.search({
      index: 'twitter_clean',
      type: 'logs',
      body: {
        query: {
          bool: {
            must: [{
              match: {
                'hashtags.text': tag
              }
            }]
          }
        },
        aggs: {
          group_by_minute: {
            date_histogram: {
              field: '@timestamp',
              interval: 'minute',
              format: "yyyy-MM-dd'T'HH:mm:ss"
            }
          }
        }
      }
    })
    .then(resp => resp.aggregations.group_by_minute.buckets);
  }
}

module.exports = new ElasticSearchStore();
