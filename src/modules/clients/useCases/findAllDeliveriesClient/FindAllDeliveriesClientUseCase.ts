import { prisma } from '../../../../database/prismaClient';

class FindAllDeliveriesClientUseCase {
  async execute(id_client: string) {
    const client = await prisma.clients.findFirst({
      where: {
        id: id_client,
      },
      select: {
        username: true,
        id: true,
        deliveries: true,
      },
    });

    if (!client) {
      throw new Error('Client not found', { cause: 404 });
    }

    return client;
  }
}

export { FindAllDeliveriesClientUseCase };
