import { Request, Response } from 'express';

import { StartDeliveryUseCase } from './UpdateDeliverymanUseCase';

class StartDeliveryController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request.body;
    const { id } = request.params;

    const startDeliveryUseCase = new StartDeliveryUseCase();
    const delivery = await startDeliveryUseCase.execute({
      id_deliveryman,
      id_delivery: id,
    });

    return response.json(delivery);
  }
}

export { StartDeliveryController };
