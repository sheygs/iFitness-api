import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import * as morgan from 'morgan';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  private morganMiddleware: (
    req: IncomingMessage,
    res: ServerResponse,
    next: (err?: any) => void,
  ) => void;

  constructor() {
    this.morganMiddleware = morgan('dev');
  }

  use(req: Request, res: Response, next: NextFunction): void {
    this.morganMiddleware(req, res, next);
  }
}
