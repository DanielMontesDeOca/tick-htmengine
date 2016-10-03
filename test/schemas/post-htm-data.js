module.exports = {
  required: true,
  type: 'object',
  properties: {
    statusCode: {
      required: true,
      enum: [200]
    },
    body: {
      required: true,
      type: 'string'
    }
  }
};
