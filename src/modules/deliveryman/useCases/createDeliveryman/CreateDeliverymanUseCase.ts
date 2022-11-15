import { hash } from 'bcrypt';

import { prisma } from '../../../../database/prismaClient';

interface ICreateDeliveryman {
  username: string;
  password: string;
}

class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username,
        },
      },
    });

    if (deliverymanExists) {
      throw new Error('Deliveryman already exists', { cause: 422 });
    }

    const hashPassword = await hash(password, 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      }
    });

    return {
      id: deliveryman.id,
      username: deliveryman.username,
    };
  }
}

export { CreateDeliverymanUseCase };
