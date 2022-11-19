import { Request, Response } from 'express';
import { FindAllDeliveriesDeliverymanUseCase } from './FindAllDeliveriesDeliverymanUseCase';

class FindAllDeliveriesDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id_client } = request.body;

    const findAllDeliveriesDeliverymanUseCase = new FindAllDeliveriesDeliverymanUseCase();
    const deliveries = await findAllDeliveriesDeliverymanUseCase.execute(id_client);

    return response.json(deliveries);
  }
}

export { FindAllDeliveriesDeliverymanController };
