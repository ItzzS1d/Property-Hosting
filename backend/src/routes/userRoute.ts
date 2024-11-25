import express from "express";
import handleAsyncError from "../middlewares/handleAsyncError";
import {
  logIn,
  register,
  profile,
  logOut,
} from "../controllers/userController";
import isAuth from "../middlewares/isAuth";
import upload from "../libs/multer";
const router = express.Router();

router
  .get("/profile", isAuth, handleAsyncError(profile))
  .post("/login", handleAsyncError(logIn))
  .post("/register", upload.single("image"), handleAsyncError(register))
  .delete("/logout", handleAsyncError(logOut));

export default router;
