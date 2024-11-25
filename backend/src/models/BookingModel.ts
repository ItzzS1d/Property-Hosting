import { Schema, Document, Types, Model, model } from "mongoose";

export interface Booking extends Document {
  customerId: Types.ObjectId;
  hostId: Types.ObjectId;
  listingId: Types.ObjectId;
  startDate: string;
  endDate: string;
  totalPrice: string;
}

const bookingSchema: Schema<Booking> = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hostId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    totalPrice: { type: String, required: true },
  },
  { timestamps: true }
);
const Booking: Model<Booking> = model<Booking>("Booking", bookingSchema);
export default Booking;
