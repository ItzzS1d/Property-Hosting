import { Request, Response } from "express";
import Booking from "../models/BookingModel";

export const bookListing = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { customerId, hostId, listingId, totalPrice, startDate, endDate } =
    req.body;
  if (await Booking.findOne({ customerId, hostId, listingId })) {
    res
      .status(400)
      .json({ success: false, error: "You've already booked this listing" });
    return;
  }
  const newBooking = new  Booking({
    customerId: req.user.id,
    hostId,
    listingId,
    totalPrice,
    startDate,
    endDate,
  });
  console.log(newBooking);
  res.status(200).json({ success: true, message: "Booking successfull" });
};

export const fetchUserBookings = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bookings = await Booking.find({ customerId: req.user.id });
  if (bookListing.length <= 0) {
    res
      .status(200)
      .json({ success: true, message: "You dont have any bookings " });
    return;
  }
  res.status(200).json({ success: true, bookings });
};
