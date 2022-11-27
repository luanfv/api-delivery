import { Request, Response } from 'express';
import { FindAllDeliveriesDeliverymanUseCase } from './FindAllDeliveriesDeliverymanUseCase';

class FindAllDeliveriesDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request.body;

    if (!id_deliveryman) {
      throw new Error('Unidentified deliveryman', { cause: 401 });
    }

    const findAllDeliveriesDeliverymanUseCase = new FindAllDeliveriesDeliverymanUseCase();
    const deliveries = await findAllDeliveriesDeliverymanUseCase.execute(id_deliveryman);

    return response.json(deliveries);
  }
}

export { FindAllDeliveriesDeliverymanController };
