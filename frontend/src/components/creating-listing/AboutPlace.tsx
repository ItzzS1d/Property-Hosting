import { FieldErrors, UseFormRegister } from "react-hook-form";
import { types } from "../../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { CreateListingTypes } from "../../pages/CreateListing";
import Placetype from "../Placetype";

interface AboutPlaceTypes {
  setCategory: (value: string) => void;
  category: string;
  setPlaceType: (value: string) => void;
  handleIncreaseCount: (value: number) => void;
  handleDecreaseCount: (value: number) => void;
  rooms: {
    title: string;
    count: number;
  }[];
  placeType: string;
  register: UseFormRegister<CreateListingTypes>;
  errors: FieldErrors<CreateListingTypes>;
}

const AboutPlace = ({
  setCategory,
  category,
  setPlaceType,
  placeType,
  register,
  errors,
  handleIncreaseCount,
  handleDecreaseCount,
  rooms,
}: AboutPlaceTypes) => {
  return (
    <div className="bg-white  px-2 md:p-10 rounded-lg  flex flex-col gap-10">
      <div>
        <h2 className="text-2xl text-[#FF5A5F] pt-5 md:pt-0">
          Step 1: Tell us about your place
        </h2>
        <hr className="bg-[#FF5A5F]  my-3" />
        <h3 className="text-lg mb-2">
          Which of these categories best describes your place
        </h3>
        <Placetype placeType={placeType} setPlaceType={setPlaceType} border />
      </div>

      <div>
        <h1 className="text-xl mb-4">What type of place will guests have?</h1>
        <div className="flex flex-col gap-5 ">
          {types.map((type, i) => (
            <div
              key={i}
              className={`border-2 flex items-center justify-between px-5 py-4 rounded-lg cursor-pointer ${category === type.name ? "bg-[#FF5A5F] text-white border-[#FF5A5F]" : "border-gray-400"}`}
              onClick={() => setCategory(type.name)}
            >
              <div>
                <p>{type.name}</p>
                <p
                  className={`${category === type.name ? "text-white" : "text-gray-500"}`}
                >
                  {type.description}
                </p>
              </div>
              <type.icon className="text-2xl" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="mb-3 text-xl">Where's your place located?</h1>

        <label htmlFor="street address" className="flex flex-col">
          <span className="text-lg">Street Address</span>
          <input
            type="text"
            placeholder="Street address"
            {...register("street", {
              required: "Street address is required",
            })}
            className="border-2 border-gray-500 py-2.5 pl-2 rounded-lg"
          />
          {errors.street?.message && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.street.message}
            </p>
          )}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <label htmlFor="street address" className="flex flex-col">
            <span className="text-lg">Apartment,Suite,etc.(if applicable)</span>
            <input
              type="text"
              placeholder="Apt,Suite,etc(if applicable)"
              className="border-2 border-gray-500 py-2.5 pl-2 rounded-lg"
            />
          </label>
          <label htmlFor="City" className="flex flex-col">
            <span className="text-lg">City</span>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              placeholder="City"
              className="border-2 border-gray-500 py-2.5 pl-2 rounded-lg"
            />
            {errors.city?.message && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.city.message}
              </p>
            )}
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <label htmlFor="Province" className="flex flex-col">
            <span className="text-lg">Province</span>
            <input
              type="text"
              id="Province"
              {...register("province", {
                required: "Province is required",
              })}
              placeholder="Province"
              className="border-2 border-gray-500 py-2.5 pl-2 rounded-lg"
            />
            {errors.province?.message && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.province.message}
              </p>
            )}
          </label>
          <label htmlFor="Country" className="flex flex-col">
            <span className="text-lg">Country</span>
            <input
              type="text"
              {...register("country", {
                required: "Country is required",
              })}
              placeholder="Country"
              className="border-2 border-gray-500 py-2.5 pl-2 rounded-lg"
            />
            {errors.country?.message && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.country.message}
              </p>
            )}
          </label>
        </div>
      </div>

      <div>
        <h1 className="text-xl mb-5">Share some basics about your place</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.map((item, i) => (
            <div
              className="flex gap-5 border-2 justify-center py-3 rounded-lg"
              key={i}
            >
              <span>{item.title}</span>
              <div className="flex gap-2">
                <button onClick={() => handleDecreaseCount(i)} type="button">
                  <RemoveCircleOutline />
                </button>
                <span>{item.count}</span>
                <button onClick={() => handleIncreaseCount(i)} type="button">
                  <AddCircleOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPlace;
