import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { prisma } from '../../../database/prismaClient';

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryman) {
      throw new Error('Username or password invalid!', { cause: 401 });
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error('Username or password invalid!', { cause: 401 });
    }

    const token = sign({ username }, '4191c3c093349c74ff5d1312f34ba8ce', {
      subject: deliveryman.id,
      expiresIn: '1d',
    });

    return { token };
  }
}

export { AuthenticateDeliverymanUseCase };
