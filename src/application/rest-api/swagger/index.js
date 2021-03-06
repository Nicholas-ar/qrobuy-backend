import { badRequest, unauthorized, notFound, serverError } from './components';
import { ordersIdPath } from './paths/orders-id-path';
import { ordersPath } from './paths/orders-path';
import { signinPath } from './paths/signin-path';
import { signupPath } from './paths/signup-path';
import { accountSchema } from './schemas/accountSchema';
import { errorSchema } from './schemas/error-schema';
import { ordersListResultSchema } from './schemas/order-list-result';
import { orderParamsSchema } from './schemas/order-params-schema';
import { orderPatchParamsSchema } from './schemas/order-patch-params-schema';
import { orderResultSchema } from './schemas/order-result-schema';
import { signinParamsSchema } from './schemas/signin-params-schema';
import { signupParamsSchema } from './schemas/signup-params-schema';

import { productsIdPath } from './paths/products-id-path';
import { productsPath } from './paths/products-path';
import { productResultSchema } from './schemas/product-result-schema';
import { productParamsSchema } from './schemas/product-params-schema';
import { productPatchParamsSchema } from './schemas/product-patch-params-schema';
import { productsListResultSchema } from './schemas/product-list-result';

export default {
  openapi: '3.0.0',
  info: {
    title: 'QRoBuy backend',
    description: 'Backend para a aplicação QRobuy',
    version: '1.0.0',
  },
  license: {
    name: 'MIT',
    url:
      'https://raw.githubusercontent.com/Nicholas-ar/qrobuy-backend/main/LICENSE.md',
  },
  externalDocs: {
    description: 'Link para o README',
    url:
      'https://raw.githubusercontent.com/Nicholas-ar/qrobuy-backend/main/README.md',
  },
  servers: [
    {
      url: '/api/v1',
    },
  ],
  tags: [
    {
      name: 'Sign In',
    },
    {
      name: 'Sign Up',
    },
    {
      name: 'Orders',
    },
    {
      name: 'Products',
    },
  ],
  paths: {
    '/signin': signinPath,
    '/signup': signupPath,
    '/orders/{id}': ordersIdPath,
    '/orders': ordersPath,
    '/products/{id}': productsIdPath,
    '/products': productsPath,
  },
  schemas: {
    account: accountSchema,
    signupParams: signupParamsSchema,
    signinParams: signinParamsSchema,
    orderParams: orderParamsSchema,
    order: orderResultSchema,
    orderList: ordersListResultSchema,
    orderPatchParams: orderPatchParamsSchema,
    error: errorSchema,
    productParams: productParamsSchema,
    product: productResultSchema,
    productList: productsListResultSchema,
    productPatchParams: productPatchParamsSchema,
  },
  components: {
    badRequest,
    unauthorized,
    notFound,
    serverError,
  },
};
