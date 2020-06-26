import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import config from "@config/auth";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function checkAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT token error");
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub } = verify(token, config.jwt.secret) as ITokenPayload;

    //Define a global req.user.id
    req.user = {
      id: sub,
    };

    next();
  } catch (err) {
    throw new Error("JWT token invalid - " + err.message);
  }
}
