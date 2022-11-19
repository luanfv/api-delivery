import { prisma } from "../../../../database/prismaClient";

interface IUpdateEndDate {
  id_delivery: string;
  id_deliveryman: string;
}

class UpdateEndDateUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateEndDate) {
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
      throw new Error('This delivery could not be completed');
    }

    const delivery = await prisma.deliveries.findFirst({
      where: {
        id: id_delivery,
        id_deliveryman,
      },
    });

    if (!delivery) {
      throw new Error('This delivery could not be completed');
    }

    return delivery;
  }
}

export { UpdateEndDateUseCase };
