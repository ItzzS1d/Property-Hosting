import { DateRange } from "react-date-range";

interface PricePanelType {
  price: number;
  handleBooking: () => void;
  dateRange: Date;
  handleSelect: Date;
  dayCount: number;
  start: Date;
  end: Date;
}
const PricePanel = ({
  price,
  dateRange,
  dayCount,
  end,
  handleSelect,
  start,
  handleBooking,
}: PricePanelType) => {
  return (
    // <div className="max-w-sm border p-5 shadow-lg rounded-lg bg-white sticky top-16 max-h-min mt-20 hidden md:block">
    //   {/* Price */}
    //   {/* <div className="text-2xl font-semibold mb-4">
    //     ${price} <span className="text-base font-normal">/ night</span>
    //   </div> */}

    //   {/* Check-in and Check-out */}
    //   {/* <div className="flex justify-between mb-4">
    //     <div className="flex-1 mr-2">
    //       <label
    //         className="block text-sm font-semibold mb-1"
    //         htmlFor="check-in"
    //       >
    //         Check-in
    //       </label>
    //       <input
    //         type="date"
    //         id="check-in"
    //         className="border p-2 rounded w-full"
    //         value={checkIn}
    //         onChange={(e) => setCheckIn(e.target.value)}
    //       />
    //     </div>
    //     <div className="flex-1 ml-2">
    //       <label
    //         className="block text-sm font-semibold mb-1"
    //         htmlFor="check-out"
    //       >
    //         Check-out
    //       </label>
    //       <input
    //         type="date"
    //         id="check-out"
    //         className="border p-2 rounded w-full"
    //         value={checkOut}
    //         onChange={(e) => setCheckOut(e.target.value)}
    //       />
    //     </div>
    //   </div>

    //   {/* Guests */}
    //   <div className="mb-4">
    //     <label className="block text-sm font-semibold mb-1" htmlFor="guests">
    //       Guests
    //     </label>
    //     <select
    //       id="guests"
    //       className="border p-2 rounded w-full"
    //       //   value={guests}
    //       //   onChange={(e) => setGuests(Number(e.target.value))}
    //     >
    //       <option value="1">1 guest</option>
    //       <option value="2">2 guests</option>
    //       <option value="3">3 guests</option>
    //       <option value="4">4 guests</option>
    //       <option value="5">5 guests</option>
    //     </select>
    //   </div> */}

    //   {/* Reserve Button */}
    //   <button
    //     className="bg-secondary text-white font-bold py-3 px-4 w-full rounded"
    //     // onClick={handleReservation}
    //   >
    //     Reserve
    //   </button>

    //   {/* Price Breakdown */}
    //   <div className="text-sm text-gray-600 mt-4">
    //     <div className="flex justify-between mb-1">
    //       <span>$120 x 3 nights</span>
    //       <span>$360</span>
    //     </div>
    //     <div className="flex justify-between mb-1">
    //       <span>Cleaning fee</span>
    //       <span>$30</span>
    //     </div>
    //     <div className="flex justify-between mb-1">
    //       <span>Service fee</span>
    //       <span>$50</span>
    //     </div>
    //     <hr className="my-2" />
    //     <div className="flex justify-between font-bold">
    //       <span className="text-xl">Total</span>
    //       <span className="text-xl">$440</span>
    //     </div>
    //   </div>
    // </div>
    <div>
      <h1>How long do you want to stay?</h1>
      <div>
        <DateRange ranges={dateRange} onChange={handleSelect} />
        {dayCount > 1 ? (
          <h2 className="text-xl">
            ${price} x {dayCount} nights
          </h2>
        ) : (
          ""
        )}
        <h2 className="text-xl">Total price: ${price * dayCount}</h2>
        <p>Start Date: {start.toDateString()}</p>
        <p>End Date: {end.toDateString()}</p>
        <button
          className="bg-[#FF5A5F] text-white py-2 rounded-md w-[60%] mb-10 mt-5"
          onClick={handleBooking}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default PricePanel;
