export class ResponseHttp {
  success: boolean;
  response: any;

  constructor(success: boolean, response: any) {
    this.success = success;
    this.response = response;
  }
}