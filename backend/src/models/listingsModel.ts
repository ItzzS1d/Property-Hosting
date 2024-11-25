import { Document, ObjectId, Model, model, Schema } from "mongoose";

export interface ListingSchemaTypes extends Document {
  user: ObjectId;
  category: string;
  placeType: string;
  rooms: {
    guests: string;
    bedrooms: string;
    beds: string;
    bathrooms: string;
  };
  address: {
    city: string;
    country: string;
    province: string;
    apartment?: string;
    street: string;
  };
  facilities: string[];
  photos: string[];
  title: string;
  description: string;
  highlight: string;
  highlightDetails: string;
  price: string;
}
const addressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
  },
});
const roomSchema = new Schema({
  guests: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: String,
    required: true,
  },
  beds: {
    type: String,
    required: true,
  },
  bathrooms: {
    type: String,
    required: true,
  },
});
const listingSchema: Schema<ListingSchemaTypes> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    highlight: { type: String, required: true },
    highlightDetails: { type: String, required: true },
    price: { type: String, required: true },
    placeType: { type: String, required: true },
    category: { type: String, required: true },
    address: { type: addressSchema, required: true },
    rooms: { type: roomSchema, required: true },
    facilities: { type: [String], required: true },
    photos: { type: [String], default: [], required: true },
  },
  { timestamps: true }
);

const Listing: Model<ListingSchemaTypes> = model<ListingSchemaTypes>(
  "Listing",
  listingSchema
);
export default Listing;
