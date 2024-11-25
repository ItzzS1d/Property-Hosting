import { isValidObjectId } from "mongoose";
import Listing, { ListingSchemaTypes } from "../models/listingsModel";
import { v2 as cloudinary } from "cloudinary";
export const createListing = async (req: any, res: any): Promise<void> => {
  const {
    title,
    description,
    price,
    address,
    facilities,
    category,
    highlight,
    highlightDetails,
    placeType,
    rooms,
  } = req.body;
  console.log(req.body);
  const newListing = new Listing({
    title,
    description,
    price,
    user: "673dfb9f66ec8b066a6e59e4",
    address: JSON.parse(address),
    rooms: JSON.parse(rooms),
    facilities: JSON.parse(facilities),
    category,
    highlight,
    highlightDetails,
    placeType,
  });

  if (req.files && Array.isArray(req.files)) {
    const uploadPromises = req.files.map(async (file: { path: string }) => {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
        folder: "realEstate",
      });
      return result;
    });

    const uploadResults = await Promise.all(uploadPromises);
    uploadResults.forEach((img) => newListing.photos.push(img.secure_url));
  }

  await newListing.save();

  res
    .status(201)
    .json({ message: "Listing created successfully", success: true });
};

export const listings = async (req: any, res: any): Promise<void> => {
  const { category } = req.query;
  let listings: ListingSchemaTypes[];
  if (category === "All") {
    listings = await Listing.find({});
  } else {
    listings = await Listing.find({ placeType: category });
  }
  console.log(listings);
  return res.status(200).json({ success: true, listings });
};

export const getListingById = async (req: any, res: any): Promise<void> => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(404).json({ success: false, error: "listing not found" });
  const listing = await Listing.findById(id).populate({
    path: "user",
    select: "-password",
  });
  if (!listing)
    return res.status(404).json({ success: false, error: "listing not found" });
  return res.status(200).json({ success: true, listing });
};
