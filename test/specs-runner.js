/**
*   Utility to run simple test cases that only need to call an endpoint and validate results.
*
*   Test cases are defined in specs/
**/

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const API = require('./helpers/app-api');
const validate = require('./helpers/validate');
const testSuites = require('./specs');

chai.should();
chai.use(chaiAsPromised);

function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time || 0);
  });
}

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
        return wait(testCase.wait)
          .then(() => API[testCase.api](testCase.fixture))
          .should.be[testCase.shouldBeSuccessful ? 'fulfilled' : 'rejected']
          .then(validate(testCase.schema))
          .then(result => testCase.validator ? testCase.validator(result) : null);
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
