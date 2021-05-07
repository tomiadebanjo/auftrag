import { Response } from 'express';

class HttpResponder {
  private res: Response;

  constructor(responseMethod: Response) {
    this.res = responseMethod;
  }

  private createResponse(
    status: boolean,
    message: string,
    data?: unknown
  ): { status: boolean; message: string; data?: unknown } {
    return {
      status,
      message,
      data,
    };
  }

  success(code: number, message: string, data?: unknown): void {
    const responsePayload = this.createResponse(true, message, data);
    this.res.status(code).send(responsePayload);
  }

  fail(code: number, message: string, data?: unknown): void {
    const responsePayload = this.createResponse(false, message, data);
    this.res.status(code).send(responsePayload);
  }
}

export default HttpResponder;
