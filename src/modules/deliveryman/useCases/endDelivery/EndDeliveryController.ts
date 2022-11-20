import { Request, Response } from 'express';

import { EndDeliveryUseCase } from './EndDeliveryUseCase';

class EndDeliveryController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request.body;
    const { id } = request.params;

    const endDeliveryUseCase = new EndDeliveryUseCase();
    const delivery = await endDeliveryUseCase.execute({
      id_deliveryman,
      id_delivery: id,
    });

    return response.json(delivery);
  }
}

export { EndDeliveryController };
