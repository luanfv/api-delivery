import { hash } from 'bcrypt';

import { ICreateClientExecuteRequest, ICreateClientExecuteResponse } from './CreateClientUseCase.d';
import { prisma } from '../../../../database/prismaClient';

class CreateClientUseCase {
  async execute({ username, password }: ICreateClientExecuteRequest): Promise<ICreateClientExecuteResponse> {
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username,
        },
      },
    });

    if (clientExists) {
      throw new Error('Client already exists', { cause: 422 });
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      }
    });

    return {
      id: client.id,
      username: client.username,
    };
  }
}

export { CreateClientUseCase };
