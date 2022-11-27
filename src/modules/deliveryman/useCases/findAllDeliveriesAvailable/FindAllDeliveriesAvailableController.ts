import { Request, Response } from 'express';

import { FindAllDeliveriesAvailableUseCase } from './FindAllDeliveriesAvailableUseCase';

class FindAllDeliveriesAvailableController {
  async handle(_: Request, response: Response) {
    const findAllDeliveriesAvailableUseCase = new FindAllDeliveriesAvailableUseCase();
    const deliveries = await findAllDeliveriesAvailableUseCase.execute();

    response.json(deliveries);
  }
}

export { FindAllDeliveriesAvailableController };
