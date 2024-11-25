import { useState } from "react";

import { DropResult } from "react-beautiful-dnd";
import { type SubmitHandler, useForm } from "react-hook-form";
import { handleCreatingListing } from "../lib/api-client";
import AboutPlace from "../components/creating-listing/AboutPlace";
import Facilities from "../components/creating-listing/Facilities";
import Spinner from "../components/ui/Spinner";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export interface CreateListingTypes {
  street: string;
  apartment?: string;
  city: string;
  province: string;
  country: string;
  title: string;
  description: string;
  highlight: string;
  highlightDetails: string;
  price: string;
  placeType: string;
  category: string;
  facilities: string[];
}

const CreateListing = () => {
  const [counts, setCounts] = useState([
    {
      title: "Guests",
      count: 0,
    },
    {
      title: "Bedrooms",
      count: 0,
    },
    {
      title: "Beds",
      count: 0,
    },
    {
      title: "Bathrooms",
      count: 0,
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [category, setCategory] = useState<string>("");
  const [placeType, setPlaceType] = useState<string>("");
  const [facilitiess, setFacilitess] = useState<string[]>([]);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateListingTypes>();

  const handleFormSubmit: SubmitHandler<CreateListingTypes> = async (
    formData: CreateListingTypes
  ) => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("highlight", formData.highlight);
      form.append("highlightDetails", formData.highlightDetails);
      form.append("price", formData.price);
      form.append("placeType", placeType);
      form.append("category", category);
      photos.forEach((photo) => {
        form.append("images", photo);
      });
      const address = {
        city: formData.city,
        province: formData.province,
        country: formData.country,
        street: formData.street,
        apartment: formData.apartment,
      };
      const rooms: { [key: string]: number } = {};
      counts.forEach((count) => {
        rooms[count.title.toLowerCase()] = count.count;
      });
      form.append("rooms", JSON.stringify(rooms));
      form.append("address", JSON.stringify(address));
      form.append("facilities", JSON.stringify(facilitiess));

      const data = await handleCreatingListing(form);
      if (data.success) {
        setLoading(false);
        navigate(`/properties?userId=${userInfo?.user._id}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
    setLoading(false);
  };
  const handleDragPhoto = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
  };
  const handleUploadPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhotos = e.target.files;
    if (newPhotos) {
      setPhotos((pre) => [...pre, ...newPhotos]);
    }
  };
  const handleRemovePhoto = (indexToRemove: number) => {
    setPhotos((pre) => {
      return pre.filter((_, idx) => idx != indexToRemove);
    });
  };
  const handleIncreaseCount = (i: number) => {
    const newCount = [...counts];
    newCount[i].count += 1;
    setCounts(newCount);
  };
  const handleDecreaseCount = (i: number) => {
    const newCount = [...counts];
    if (newCount[i].count > 0) {
      newCount[i].count -= 1;
    }
    setCounts(newCount);
  };
  return (
    <main className="bg-[#f8f8f8]">
      <h1 className="text-3xl mb-5 md:translate-x-32 ">Public Your Place</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* step-1 */}
        <AboutPlace
          handleDecreaseCount={handleDecreaseCount}
          handleIncreaseCount={handleIncreaseCount}
          rooms={counts}
          errors={errors}
          placeType={placeType}
          setCategory={setCategory}
          register={register}
          category={category}
          setPlaceType={setPlaceType}
        />

        {/* Step-2 */}
        <div className="bg-white  px-2 md:p-10 rounded-lg   mt-10 pt-8 md:pt-10">
          <h1 className="text-2xl text-[#FF5A5F]">
            Step 2: Make your place stand out
          </h1>
          <hr className="my-4" />
          <p className="text-xl mb-4">
            Tell guests what your place has to offer
          </p>
          <Facilities
            errors={errors}
            facilitiess={facilitiess}
            handleDragPhoto={handleDragPhoto}
            handleUploadPhotos={handleUploadPhotos}
            photos={photos}
            register={register}
            setFacilitess={setFacilitess}
            handleRemovePhoto={handleRemovePhoto}
          />
          <button
            className={`mt-10  bg-[#FF5A5f] text-white px-8 rounded-lg py-3 w-full md:w-40 mb-10 md:mb-0 flex justify-center`}
          >
            {loading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
