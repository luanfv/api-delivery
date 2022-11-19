import { Router } from 'express';

import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';

import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
routes.post('/client/', createClientController.handle);
routes.post('/client/authenticate/', authenticateClientController.handle);

const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
routes.post('/deliveryman/', createDeliverymanController.handle);
routes.post('/deliveryman/authenticate/', authenticateDeliverymanController.handle);

const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
routes.post('/delivery/', ensureAuthenticateClient, createDeliveryController.handle);
routes.get('/delivery/available/', findAllAvailableController.handle);

export { routes };
