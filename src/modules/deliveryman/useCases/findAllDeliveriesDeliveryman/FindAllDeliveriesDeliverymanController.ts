import { Request, Response } from 'express';
import { FindAllDeliveriesDeliverymanUseCase } from './FindAllDeliveriesDeliverymanUseCase';

class FindAllDeliveriesDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id_client } = request.body;

    if (!id_client) {
      throw new Error('Unidentified deliveryman', { cause: 401 });
    }

    const findAllDeliveriesDeliverymanUseCase = new FindAllDeliveriesDeliverymanUseCase();
    const deliveries = await findAllDeliveriesDeliverymanUseCase.execute(id_client);

    return response.json(deliveries);
  }
}

export { FindAllDeliveriesDeliverymanController };
