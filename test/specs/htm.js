const chai = require('chai');

chai.should();

const spec = {
  name: 'HTM',
  cases: [
    {
      name: 'should post data successfully',
      api: 'postHTMData',
      fixture: require('../fixtures/htm').data,
      schema: require('../schemas/post-htm-data'),
      shouldBeSuccessful: true
    },
    {
      name: 'should get data successfully',
      api: 'getHTMData',
      fixture: require('../fixtures/htm').data,
      schema: require('../schemas/get-htm-data'),
      shouldBeSuccessful: true,
      wait: 500, // Wait for posted data to be processed
      validator: (data) => {
        const fixture = require('../fixtures/htm').data;
        const result = data[0];

        result.value.should.be.equal(fixture.value);
        result.timestamp.should.be.equal(fixture.timestamp);
      }
    }
  ]
};

module.exports = spec;
