import { Router } from 'express';

import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';

import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { FindAllDeliveriesClientController } from './modules/clients/useCases/findAllDeliveriesClient/FindAllDeliveriesClientController';
import { FindAllDeliveriesDeliverymanController} from './modules/deliveryman/useCases/findAllDeliveriesDeliveryman/FindAllDeliveriesDeliverymanController';
import { CreateDeliveryController } from './modules/clients/useCases/createDelivery/CreateDeliveryController';
import { FindAllDeliveriesAvailableController } from './modules/deliveryman/useCases/findAllDeliveriesAvailable/FindAllDeliveriesAvailableController';
import { StartDeliveryController } from './modules/deliveryman/useCases/startDelivery/UpdateDeliverymanController';
import { EndDeliveryController } from './modules/deliveryman/useCases/endDelivery/EndDeliveryController';

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const findAllDeliveriesClientController = new FindAllDeliveriesClientController();
const createDeliveryController = new CreateDeliveryController();
routes.post('/client/', createClientController.handle);
routes.post('/client/authenticate/', authenticateClientController.handle);
routes.get('/client/deliveries/', ensureAuthenticateClient, findAllDeliveriesClientController.handle);
routes.post('/delivery/', ensureAuthenticateClient, createDeliveryController.handle);

const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController();
const findAllDeliveriesAvailableController = new FindAllDeliveriesAvailableController();
const startDeliveryController = new StartDeliveryController();
const endDeliveryController = new EndDeliveryController();
routes.post('/deliveryman/', createDeliverymanController.handle);
routes.post('/deliveryman/authenticate/', authenticateDeliverymanController.handle);
routes.get('/deliveryman/deliveries/', ensureAuthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle);
routes.get('/delivery/available/', ensureAuthenticateDeliveryman, findAllDeliveriesAvailableController.handle);
routes.patch('/delivery/start/:id/', ensureAuthenticateDeliveryman, startDeliveryController.handle);
routes.patch('/delivery/end/:id/', ensureAuthenticateDeliveryman, endDeliveryController.handle);

export { routes };
