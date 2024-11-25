import express from "express";
import {
  createListing,
  getListingById,
  listings,
} from "../controllers/listingsController";
import handleAsyncError from "./../middlewares/handleAsyncError";
import upload from "../libs/multer";
const router = express.Router();

router
  .route("/")
  .post(upload.array("images"), handleAsyncError(createListing))
  .get(handleAsyncError(listings));

router.get("/:id", handleAsyncError(getListingById));

//   .post("/", upload.array("images"), handleAsyncError(createListing))
//   .get("/", listings);

export default router;
