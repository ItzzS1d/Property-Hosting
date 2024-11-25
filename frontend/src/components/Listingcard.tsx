import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Hammer from "hammerjs";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { ListingSchemaTypes } from "../../../backend/src/models/listingsModel";

interface ListingTypes {
  listing: ListingSchemaTypes;
}

const Listingcard = ({ listing }: ListingTypes) => {
  console.log(listing);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const swiperRef = useRef<HTMLImageElement>(null);
  const images = listing.photos;
  const nextImg = useCallback(() => {
    setImageIndex((prevIdx) => (prevIdx + 1) % images.length);
  }, [images.length]);

  const prevImg = useCallback(() => {
    setImageIndex((prevIdx) => (prevIdx - 1 + images.length) % images.length);
  }, [images.length]);
  useEffect(() => {
    if (swiperRef.current) {
      const hammer = new Hammer(swiperRef.current);

      hammer.on("swipeleft", () => {
        nextImg();
      });

      hammer.on("swiperight", () => {
        prevImg();
      });

      return () => {
        hammer.destroy();
      };
    }
  }, [nextImg, prevImg]);
  return (
    <div className="relative">
      <div className="group">
        <Link to={`/view/${listing._id}`}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Property"
              ref={swiperRef}
              className={`rounded-xl h-[40vh] w-full object-cover ${i !== imageIndex ? "hidden" : "flex"}`}
              onClick={nextImg}
            />
          ))}
        </Link>

        {/* Left Arrow */}
        <MdArrowBackIos
          onClick={prevImg}
          className="absolute top-1/3 left-4   bg-gray-400 text-3xl rounded-full p-1  cursor-pointer  sm:group-hover:block hidden"
        />
        {/* Right Arrow */}
        <MdArrowForwardIos
          onClick={nextImg}
          className="absolute top-1/3 right-4    bg-gray-400 text-3xl rounded-full p-1 cursor-pointer  sm:group-hover:block hidden"
        />
      </div>

      <div className="ml-1 mt-3">
        <p className="text-lg font-semibold">
          {listing.address.city} , {listing.address.country}
        </p>
        <p className="text-sm text-gray-600 my-1">{listing.highlight}</p>
        <p className="text-xl font-bold mb-5">${listing.price}/night</p>
      </div>
    </div>
  );
};

export default Listingcard;
