export const orderResultSchema = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    cpf: {
      type: 'string',
    },
    price: {
      type: 'integer',
    },
    date: {
      type: 'string',
    },
    retrieved: {
      type: 'boolean',
    },
  },
};