import { Request, Response } from 'express';

import { StartDeliveryUseCase } from './StartDeliveryUseCase';

class StartDeliveryController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request.body;
    const { id } = request.params;

    if (!id_deliveryman) {
      throw new Error('Unidentified deliveryman', { cause: 401 });
    }

    if (!id) {
      throw new Error('Missing information to complete this process', { cause: 422 });
    }

    const startDeliveryUseCase = new StartDeliveryUseCase();
    const delivery = await startDeliveryUseCase.execute({
      id_deliveryman,
      id_delivery: id,
    });

    return response.json(delivery);
  }
}

export { StartDeliveryController };
