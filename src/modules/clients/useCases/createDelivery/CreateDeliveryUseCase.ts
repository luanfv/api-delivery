import { prisma } from '../../../../database/prismaClient';

interface ICreateDelivery {
  item_name: string;
  id_client: string;
}

class CreateDeliveryUseCase {
  async execute({ item_name, id_client }: ICreateDelivery) {
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
