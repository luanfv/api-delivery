import { prisma } from "../../../../database/prismaClient";

interface IUpdateDeliveryman {
  id_delivery: string;
  id_deliveryman: string;
}

class UpdateDeliverymanUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateDeliveryman) {
    const result = await prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman,
      },
    });

    if (result.count === 0) {
      throw new Error('this delivery could not be started');
    }

    const delivery = await prisma.deliveries.findFirst({
      where: {
        id: id_delivery,
      },
    });

    if (!delivery) {
      throw new Error('This delivery could not be completed');
    }

    return delivery;
  }
}

export { UpdateDeliverymanUseCase };
