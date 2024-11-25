import { Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const generateTokenAndSetCookie = (
  userId: ObjectId,

  res: Response
) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  res.cookie("auth_token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
};

export default generateTokenAndSetCookie;
