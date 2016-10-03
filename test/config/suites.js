module.exports = [
  {
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
        shouldBeSuccessful: true
      }
    ]
  }
];
