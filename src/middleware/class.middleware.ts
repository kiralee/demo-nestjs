import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ClassLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const method: string = req.method;
    const path: string = req.path;
    console.log(`${method}...........=> ${path}`);
    return next();
  }
}
