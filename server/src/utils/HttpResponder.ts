import { Response } from 'express';

class HttpResponder {
  private res: Response;

  constructor(responseMethod: Response) {
    this.res = responseMethod;
  }

  private createResponse(
    success: boolean,
    message: string,
    data?: unknown
  ): { success: boolean; message: string; data?: unknown } {
    return {
      success,
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
