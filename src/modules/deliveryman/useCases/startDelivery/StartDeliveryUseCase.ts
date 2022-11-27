import { prisma } from "../../../../database/prismaClient";

interface IStartDelivery {
  id_delivery: string;
  id_deliveryman: string;
}

class StartDeliveryUseCase {
  async execute({ id_delivery, id_deliveryman }: IStartDelivery) {
    const result = await prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman,
      },
    });

    if (result.count === 0) {
      throw new Error('Delivery is not found', { cause: 404 });
    }

    const delivery = await prisma.deliveries.findFirst({
      where: {
        id: id_delivery,
      },
    });

    return delivery;
  }
}

export { StartDeliveryUseCase };
