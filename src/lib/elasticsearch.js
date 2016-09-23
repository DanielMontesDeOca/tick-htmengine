const elasticsearch = require('elasticsearch');
const config = require('../config/elasticsearch');

module.exports = new elasticsearch.Client(config);
