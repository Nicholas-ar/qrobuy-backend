import Router from 'express';
import { makeSignInController } from '../../../domain/controllers/factories/signin-controller-factory';
import { makeSignUpController } from '../../../domain/controllers/factories/signup-controller-factory';
import { expressRouterAdapter } from '../../services/adapters/web/express-adapter';

export const authenticationRoutes = Router();

authenticationRoutes.post(
  '/signin',
  expressRouterAdapter(makeSignInController(), 'execute')
);

authenticationRoutes.post(
  '/signup',
  expressRouterAdapter(makeSignUpController(), 'execute')
);
