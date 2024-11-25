import { Request, Response } from "express";
import User, { UserSchemaTypes } from "../models/userModel";
import generateTokenAndSetCookie from "../libs/generateTokenAndSetCookie";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

export const profile = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({ success: true, user });
};

export const logIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, error: "email and password is required" });
    return;
  }
  const user = await User.findOne({ email });
  if (!user) {
    res
      .status(400)
      .json({ success: false, error: "Invalid email or password" });
    return;
  }
  if (!(await bcrypt.compare(password, user.password))) {
    res
      .status(400)
      .json({ success: false, error: "Invalid email or password" });
    return;
  }
  generateTokenAndSetCookie(user.id, res);

  res.status(200).json({ success: true, user });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, password }: UserSchemaTypes = req.body;
  if (!firstName || !lastName || !email || !password || !req.file) {
    res.status(400).json({ success: false, error: "All feilds are required" });
    return;
  }
  if (await User.findOne({ email })) {
    res.status(400).json({ success: false, error: "Email already in use" });
    return;
  }

  const image = await cloudinary.uploader.upload(req.file!.path, {
    resource_type: "image",
    folder: "realEstate",
  });
  await User.create({
    firstName,
    lastName,
    email,
    password,
    profilePic: image.secure_url,
  });

  res.status(201).json({ success: true, message: "registration successfull" });
};

export const logOut = async (req: Request, res: Response): Promise<void> => {
  const { auth_token } = req.cookies;
  if (auth_token) {
    res.clearCookie("auth_token");
  }

  res.status(200).json({ success: true, message: "Logout succesfull" });
};
