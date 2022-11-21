import { Request, Response } from 'express';
import { FindAllDeliveriesClientUseCase } from './FindAllDeliveriesClientUseCase';

class FindAllDeliveriesClientController {
  async handle(request: Request, response: Response) {
    const { id_client } = request.body;

    if (!id_client) {
      throw new Error('Unidentified client', { cause: 401 });
    }

    const findAllDeliveriesClientUseCase = new FindAllDeliveriesClientUseCase();
    const deliveries = await findAllDeliveriesClientUseCase.execute(id_client);

    return response.json(deliveries);
  }
}

export { FindAllDeliveriesClientController };
