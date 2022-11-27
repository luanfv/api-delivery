import { prisma } from '../../../../database/prismaClient';
import { IDelivery } from '../../../../database/tables';
import { ICreateDeliveryExecuteRequest } from './CreateDeliveryUseCase.d';

class CreateDeliveryUseCase {
  async execute({ item_name, id_client }: ICreateDeliveryExecuteRequest): Promise<IDelivery> {
    try {
      const delivery = await prisma.deliveries.create({
        data: {
          item_name,
          id_client,
        },
      });

      return delivery;
    } catch {
      throw new Error('Not found client', { cause: 401 });
    }
  }
}

export { CreateDeliveryUseCase };
