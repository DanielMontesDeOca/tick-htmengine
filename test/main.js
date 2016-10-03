const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const API = require('./helpers/app-api');
const validate = require('./helpers/validate');
const {testSuites} = require('./config');

chai.should();
chai.use(chaiAsPromised);

testSuites.forEach((suite) => {
  describe(suite.name, () => {
    before(() => {
      const tasks = [];

      if (suite.before) {
        tasks.push(suite.before());
      }

      return Promise.all(tasks);
    });

    beforeEach(() => {
      if (suite.beforeEach) {
        return suite.beforeEach();
      }
    });

    suite.cases.forEach((testCase) => {
      it(testCase.name, () => {
        return API[testCase.api](testCase.fixture)
          .should.be[testCase.shouldBeSuccessful ? 'fulfilled' : 'rejected']
          .then(validate(testCase.schema));
      });
    });

    afterEach(() => {
      if (suite.afterEach) {
        return suite.afterEach();
      }
    });

    after(() => {
      if (suite.after) {
        return suite.after();
      }
    });
  });
});
