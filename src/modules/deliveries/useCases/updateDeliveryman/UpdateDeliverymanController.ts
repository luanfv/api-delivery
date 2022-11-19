import { Request, Response } from 'express';
import { UpdateDeliverymanUseCase } from './UpdateDeliverymanUseCase';

class UpdateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request.body;
    const { id } = request.params;

    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase();
    const delivery = await updateDeliverymanUseCase.execute({
      id_deliveryman,
      id_delivery: id,
    });

    return response.json(delivery);
  }
}

export { UpdateDeliverymanController };
