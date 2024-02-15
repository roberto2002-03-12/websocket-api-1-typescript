interface IResponseError {
  message: string;
}

export class HttpError extends Error {
  statusCode: number;
  success: boolean;
  response: IResponseError; 

  constructor(statusCode: number, sucess: boolean, response: IResponseError) {
    super();
    this.statusCode = statusCode;
    this.success = sucess;
    this.response = response;
  }
}