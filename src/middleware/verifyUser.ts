import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

const verify = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.auth;

  console.log(token);

  next();
};

export default verify;
