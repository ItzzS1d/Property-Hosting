import express from "express";
import handleAsyncError from "../middlewares/handleAsyncError";
import {
  bookListing,
  fetchUserBookings,
} from "../controllers/bookingController";
import isAuth from "../middlewares/isAuth";
const router = express.Router();

router.post("/", isAuth, handleAsyncError(bookListing));
router.get("/", isAuth, handleAsyncError(fetchUserBookings));

export default router;
