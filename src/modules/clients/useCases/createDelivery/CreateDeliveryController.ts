import { Request, Response } from 'express';

import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';
import { ICreateDeliveryControllerHandleRequestBody } from './CreateDeliveryController.d';

class CreateDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { item_name, id_client }: ICreateDeliveryControllerHandleRequestBody = request.body;

    if (!item_name) {
      throw new Error('Didn\'t receive item_name');
    }

    if (!id_client) {
      throw new Error('Didn\'t receive the client\'s identity', { cause: 401 });
    }

    const createDeliveryUseCase = new CreateDeliveryUseCase();
    const delivery = await createDeliveryUseCase.execute({
      item_name,
      id_client,
    });

    return response.status(201).json(delivery);
  }
}

export { CreateDeliveryController };
