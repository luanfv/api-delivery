import { prisma } from '../../../../database/prismaClient';

class FindAllDeliveriesAvailableUseCase {
  async execute() {
    const deliveries = await prisma.deliveries.findMany({
      where: {
        end_at: null,
        id_deliveryman: null,
      },
    });

    return deliveries;
  }
}

export { FindAllDeliveriesAvailableUseCase };
