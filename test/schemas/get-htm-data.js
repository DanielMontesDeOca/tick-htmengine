module.exports = {
  required: true,
  type: 'array',
  "minItems": 1,
  items: {
    type: 'object',
    properties: {
      value: {
        required: true,
        type: 'number'
      },
      timestamp: {
        required: true,
        type: 'number'
      }
    },
    additionalProperties: false
  }
};
