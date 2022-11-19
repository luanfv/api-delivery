import { Request, Response } from 'express';

import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';

class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { item_name, id_client } = request.body;

    const createDeliveryUseCase = new CreateDeliveryUseCase();
    const delivery = await createDeliveryUseCase.execute({
      item_name,
      id_client,
    });

    return response.status(201).json(delivery);
  }
}

export { CreateDeliveryController };