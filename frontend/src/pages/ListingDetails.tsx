import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { fetchListing, handleListingBooking } from "../lib/api-client";
import { FaHeart } from "react-icons/fa";
import PricePanel from "../components/PricePanel";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useAuth } from "../contexts/AuthContext";

export interface PropertyDetails {
  _id: string;
  title: string;
  hightlight: string;
  price: string;
  highlightDetails: string;
  facilities: string[];
  photos: string[];
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePic?: string;
  };

  address: {
    apartment: string;
    city: string;
    province: string;
    street: string;
    country: string;
  };
  placeType: string;
  rooms: {
    guests: string;
    bedrooms: string;
    bathrooms: string;
    beds: string;
  };
}
const ListingDetails = () => {
  const [listing, setListing] = useState<PropertyDetails | null>(null);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { id } = useParams();
  useEffect(() => {
    const fetchListin = async () => {
      try {
        const data = await fetchListing(id || "");
        setListing(data.listing);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchListin();
  }, [id]);
  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };
  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);
  const handleBooking = async () => {
    const bookingData = {
      listingId: id,
      startDate: start,
      endDate: end,
      hostId: listing?.user._id,
      totalPrice: dayCount * listing?.price,
    };
    try {
      const data = await handleListingBooking(bookingData);
      console.log(data);
      navigate(`/triplists?userId=${userInfo?.user._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl my-5">{listing?.title}</h1>

        <button className="flex items-center gap-1 text-xl">
          <FaRegHeart /> <span>Save</span>
        </button>
        <FaHeart className="hidden" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {listing?.photos.map((img, i) => (
          <div key={i}>
            <img src={img} />
          </div>
        ))}
      </div>
      <div className="md:grid grid-cols-[2fr,1fr]   mt-4  gap-16 ">
        {/* left */}
        <div>
          <div>
            <p className="h3 mb-1 text-black">
              {listing?.address.city} {listing?.address.country}
            </p>
            <div className="flex gap-2 whitespace-nowrap my-2 md:my-0">
              <p className="md:text-[1.1rem] font-medium text-black">
                Guests {listing?.rooms.guests} &middot;
              </p>
              <p className="md:text-[1.1rem] font-medium text-black">
                Bedrooms {listing?.rooms.bedrooms} &middot;
              </p>
              <p className="md:text-[1.1rem] font-medium text-black">
                Beds {listing?.rooms.beds} &middot;
              </p>
              <p className="md:text-[1.1rem] font-medium text-black">
                Bathrooms {listing?.rooms.bathrooms}
              </p>
            </div>
            <div className="mt-1 flex items-center">
              <FaStar className="text-xl" />{" "}
              <p className="pl-1 font-medium ">4.91 &middot;</p>
              <a href="#reviews" className="underline font-medium">
                134 reviews
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-5 border-y border-gray-400 py-5 ">
            <Link to={`/user/view/${listing?.user._id}`}>
              <img
                src={listing?.user.profilePic}
                alt=""
                className="rounded-full"
                width={60}
              />
            </Link>
            <div>
              <h1 className="font-medium text-[1.1rem]">
                {" "}
                Hosted By {listing?.user.firstName}{" "}
              </h1>

              <h1 className="text-gray-500">
                Superhost &middot; 5 years hosting
              </h1>
            </div>
          </div>
          <div className="py-5 border-b border-gray-400">
            <h1 className="text-2xl">Description</h1>
            <p className=" text-[1rem] text-black leading-relaxed ">
              {listing?.highlightDetails}
            </p>
          </div>
          <div className="py-10 border-b border-gray-400 ">
            <h1 className="h3 mb-4 text-2xl">What this place offers</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-content-center">
              {listing?.facilities.map((facility) => {
                const matchingFacility = facilities.find(
                  (fac) => fac.name === facility
                );
                return (
                  <div key={facility}>
                    <div className="flex items-center gap-2">
                      <matchingFacility.icon className="text-3xl" />
                      <p>{facility}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* right panel*/}
        <PricePanel
          price={listing?.price}
          handleBooking={handleBooking}
          dateRange={dateRange}
          dayCount={dayCount}
          end={end}
          handleSelect={handleSelect}
          start={start}
        />
      </div>
    </div>
  );
};

export default ListingDetails;
