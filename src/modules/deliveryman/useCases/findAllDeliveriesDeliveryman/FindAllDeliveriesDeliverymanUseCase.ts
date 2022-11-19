import { prisma } from '../../../../database/prismaClient';

class FindAllDeliveriesDeliverymanUseCase {
  async execute(id_deliveryman: string) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        id: id_deliveryman,
      },
      select: {
        username: true,
        id: true,
        deliveries: true,
      },
    });

    if (!deliveryman) {
      throw new Error('Deliveryman not found', { cause: 404 });
    }

    return deliveryman;
  }
}

export { FindAllDeliveriesDeliverymanUseCase };
