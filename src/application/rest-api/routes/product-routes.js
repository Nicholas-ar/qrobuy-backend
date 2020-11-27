import Router from 'express';
import { makeAuthenticationMiddleware } from '../../../domain/controllers/factories/make-authentication-middleware';
import { makeProductController } from '../../../domain/controllers/factories/product-controller-factory';
import { expressRouterAdapter } from '../../services/adapters/web/express-adapter';
import { expressMiddlewareAdapter } from '../../services/adapters/web/express-middleware-adapter';

export const productRoutes = Router();

const adminAuth = expressMiddlewareAdapter(makeAuthenticationMiddleware(true));

productRoutes.get(
  '/products',
  expressRouterAdapter(makeProductController(), 'retrieveAll')
);
productRoutes.post(
  '/product',
  expressRouterAdapter(makeProductController(), 'createProduct')
);
productRoutes.get(
  '/product/:_id',
  expressRouterAdapter(makeProductController(), 'retrieveProductById')
);
productRoutes.patch(
  '/product/:_id',
  expressRouterAdapter(makeProductController(), 'updateProduct')
);
productRoutes.delete(
  '/product/:_id',
  expressRouterAdapter(makeProductController(), 'deleteProduct')
);
