import { Request, Response } from 'express';

import { CreateClientUseCase } from './CreateClientUseCase';
import { ICreateClientControllerHandleRequestBody } from './CreateClientController.d';

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password }: ICreateClientControllerHandleRequestBody = request.body;

    if (!username) {
      throw new Error('Didn\'t receive username', { cause: 422 });
    }

    if (!password) {
      throw new Error('Didn\'t receive password', { cause: 422 });
    }

    const createClientUseCase = new CreateClientUseCase();
    const result = await createClientUseCase.execute({
      username,
      password,
    });

    return response.status(201).json(result);
  }
}

export { CreateClientController };
