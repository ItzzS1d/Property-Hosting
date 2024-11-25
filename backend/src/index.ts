import express, { NextFunction, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./libs/db";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute";
import listingsRoute from "./routes/listingsRoute";
import bookingRoute from "./routes/bookingRoute";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/listings", listingsRoute);
app.use("/api/v1/bookings", bookingRoute);

app.use((err: any, req: Request, res: any, next: NextFunction) => {
  const { status = 500, message = "Something went wrong" } = err;
  return res.status(status).json(message);
});
app.listen(process.env.PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
