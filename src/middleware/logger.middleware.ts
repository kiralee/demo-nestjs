import { Request, Response, NextFunction } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const method: string = req.method;
  const path: string = req.path;
  console.log(`${method}...........=> ${path}`);
  return next();
}
