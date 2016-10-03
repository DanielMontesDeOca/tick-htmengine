const validator = require('is-my-json-valid');
const chai = require('chai');

chai.should();

function validate(schema) {
  return (value) => {
    const validation = validator(schema);

    return validation(value).should.be.eql(true, JSON.stringify(validation.errors));
  };
}

module.exports = validate;
