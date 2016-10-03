class GetTwitterHashtagCount {
  constructor(database, tag) {
    this.database = database;
    this.tag = tag;
  }

  execute() {
    return Promise.resolve()
      .then(this.getData.bind(this))
      .then(this.buildResponse.bind(this));
  }

  getData() {
    return this.database.getTwitterHashtagCount(this.tag);
  }

  buildResponse(data) {
    const response = data.map(item => this._getInfluxdbInput(item));

    return response.join('\n');
  }

  _formatDate(date) {
    return parseInt(date) * 1000000;
  }

  _getInfluxdbInput(data) {
    const {doc_count, key} = data;
    const timestamp = this._formatDate(key);
    const result = `hashtags,name=${this.tag} value=${doc_count} ${timestamp}`;

    return result;
  }
}

module.exports = GetTwitterHashtagCount;
