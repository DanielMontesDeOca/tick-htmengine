module.exports = {
  required: true,
  type: 'array',
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
