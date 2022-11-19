import { prisma } from '../../../../database/prismaClient';

class FindAllDeliveriesUseCase {
  async execute(id_client: string) {
    const client = await prisma.clients.findFirst({
      where: {
        id: id_client,
      },
      include: {
        Deliveries: true,
      },
    });

    if (!client) {
      throw new Error('Client not found', { cause: 404 });
    }

    return {
      id: client.id,
      username: client.username,
      deliveries: client.Deliveries,
    };
  }
}

export { FindAllDeliveriesUseCase };
