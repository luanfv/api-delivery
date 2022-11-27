interface ICreateClientExecuteRequest {
  username: string;
  password: string;
}

interface ICreateClientExecuteResponse {
  id: string;
  username: string;
}

export { ICreateClientExecuteRequest, ICreateClientExecuteResponse };
