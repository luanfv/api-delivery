import { Request, Response } from 'express';

import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';

class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { item_name, id_client } = request.body;

    if (!item_name) {
      throw new Error('Unidentified "item_name"');
    }

    if (!id_client) {
      throw new Error('Unidentified client', { cause: 401 });
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
