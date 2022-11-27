import { prisma } from '../../../../database/prismaClient';

interface IEndDelivery {
  id_delivery: string;
  id_deliveryman: string;
}

class EndDeliveryUseCase {
  async execute({ id_delivery, id_deliveryman }: IEndDelivery) {
    const result = await prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman,
      },
      data: {
        end_at: new Date(),
      },
    });

    if (result.count === 0) {
      throw new Error('Delivery is not found', { cause : 404 });
    }

    const delivery = await prisma.deliveries.findFirst({
      where: {
        id: id_delivery,
        id_deliveryman,
      },
    });

    return delivery;
  }
}

export { EndDeliveryUseCase };
