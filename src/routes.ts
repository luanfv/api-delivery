import { Router } from 'express';

import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';

import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController';
import { FindAllDeliveriesClientController } from './modules/clients/useCases/findAllDeliveriesClient/FindAllDeliveriesClientController';
import { FindAllDeliveriesDeliverymanController} from './modules/deliveryman/useCases/findAllDeliveriesDeliveryman/FindAllDeliveriesDeliverymanController';
import { UpdateEndDateController } from './modules/deliveries/useCases/updateEndDate/UpdateEndDateController';

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
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const updateEndDateController = new UpdateEndDateController();
routes.post('/deliveryman/', createDeliverymanController.handle);
routes.post('/deliveryman/authenticate/', authenticateDeliverymanController.handle);
routes.get('/deliveryman/deliveries/', ensureAuthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle);
routes.get('/delivery/available/', ensureAuthenticateDeliveryman, findAllAvailableController.handle);
routes.patch('/delivery/start/:id/', ensureAuthenticateDeliveryman, updateDeliverymanController.handle);
routes.patch('/delivery/end/:id/', ensureAuthenticateDeliveryman, updateEndDateController.handle);

export { routes };
