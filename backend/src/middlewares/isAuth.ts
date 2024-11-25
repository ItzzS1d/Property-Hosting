import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend the Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        isAdmin: boolean;
      };
    }
  }
}

const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  const { auth_token } = req.cookies;
  if (!auth_token) {
    res.status(401).json({ error: "You are not authenticated" });
    return;
  }

  try {
    jwt.verify(
      auth_token,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(403).json({ error: "Invalid token" });
        }

        req.user = {
          id: decoded.userId,
          isAdmin: decoded.isAdmin,
        };
      }
    );

    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
    return;
  }
};

export default isAuth;
