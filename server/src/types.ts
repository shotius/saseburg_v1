import { Request, Response } from 'express';

export type MyContext = {
  req: Request;
  res: Response;
};

export type Sex = "male" | "female" | "other";
