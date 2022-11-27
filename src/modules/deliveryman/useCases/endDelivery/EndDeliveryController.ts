import { Request, Response } from 'express';

import { EndDeliveryUseCase } from './EndDeliveryUseCase';

class EndDeliveryController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request.body;
    const { id } = request.params;

    if (!id_deliveryman) {
      throw new Error('Didn\'t receive the deliveryman\'s identify', { cause: 401 });
    }

    if (!id) {
      throw new Error('Missing information to complete this process', { cause: 422 });
    }

    const endDeliveryUseCase = new EndDeliveryUseCase();
    const delivery = await endDeliveryUseCase.execute({
      id_deliveryman,
      id_delivery: id,
    });

    return response.json(delivery);
  }
}

export { EndDeliveryController };
