import { Request, Response } from "express";
import { Redis } from "ioredis";

export interface myContext {
  req: Request;
  res: Response;
  redis: Redis;
}

export interface PasswordResponse {
  min: string;
  max: string;
  uppercase: string;
  lowercase: string;
  digits: string;
  spaces: string;
  [key: string]: string;
}
