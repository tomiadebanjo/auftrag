import { Response } from 'express';

interface ResponseFormat {
  status: boolean;
  message: string;
  data?: unknown;
  error?: unknown;
}

class HttpResponder {
  private res: Response;

  constructor(responseMethod: Response) {
    this.res = responseMethod;
  }

  private createResponse(
    status: boolean,
    message: string,
    data?: unknown
  ): ResponseFormat {
    const payload: ResponseFormat = {
      status,
      message,
    };
    if (status) {
      payload.data = data;
    } else {
      payload.error = data;
    }
    return payload;
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
