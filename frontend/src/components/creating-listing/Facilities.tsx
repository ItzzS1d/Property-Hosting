import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoIosImages } from "react-icons/io";
import { facilities } from "../../data";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { CreateListingTypes } from "../../pages/CreateListing";
import { type Dispatch, type SetStateAction } from "react";

interface FacilitiesTypes {
  setFacilitess: Dispatch<SetStateAction<string[]>>;
  facilitiess: string[];
  handleDragPhoto: (result: DropResult) => void;
  handleUploadPhotos: (event: React.ChangeEvent<HTMLInputElement>) => void;
  photos: File[];
  handleRemovePhoto: (idx: number) => void;
  register: UseFormRegister<CreateListingTypes>;
  errors: FieldErrors<CreateListingTypes>;
}

const Facilities = ({
  errors,
  facilitiess,
  handleDragPhoto,
  handleUploadPhotos,
  handleRemovePhoto,
  photos,
  register,
  setFacilitess,
}: FacilitiesTypes) => {
  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-5">
        {facilities.map((item, i) => (
          <div
            key={i}
            onClick={() => setFacilitess((pre) => [...pre, item.name])}
            className={`flex flex-col items-center gap-1 py-4 border justify-center text-center rounded-lg cursor-pointer ${facilitiess.includes(item.name) ? "bg-[#FF5A5F] text-white" : ""}`}
          >
            <item.icon className="text-xl" />
            <p className="text-sm break-words">{item.name}</p>
          </div>
        ))}
      </div>
      <h1 className="text-xl mt-5">Add some photos of your place</h1>
      <div>
        <DragDropContext onDragEnd={handleDragPhoto}>
          <Droppable droppableId="photos" direction="horizontal">
            {(provided) => (
              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-xl shadow-lg"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {photos.length === 0 && (
                  <>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleUploadPhotos}
                      multiple
                      id="imageUpload"
                      hidden
                    />
                    <label
                      htmlFor="imageUpload"
                      className="group flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="h-52 w-full flexCenter">
                        <IoIosImages className="text-6xl text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                      <p className="text-gray-500 group-hover:text-gray-700">
                        Upload from your device
                      </p>
                    </label>
                  </>
                )}
                {photos.length > 0 && (
                  <>
                    {photos.map((img, idx) => (
                      <Draggable
                        key={idx}
                        draggableId={idx.toString()}
                        index={idx}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            className="relative group"
                          >
                            <img
                              src={URL.createObjectURL(img)}
                              className="aspect-square object-cover h-full rounded-xl shadow-md"
                            />
                            <button
                              type="button"
                              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-200"
                              onClick={() => handleRemovePhoto(idx)}
                            >
                              <DeleteIcon className="text-red-600" />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    <input
                      type="file"
                      name=""
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleUploadPhotos}
                      multiple
                      hidden
                    />
                    <label
                      htmlFor="imageUpload"
                      className="group flexCenter flex-col border-2 border-dashed border-gray-300 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="h-52 w-full flexCenter">
                        <IoIosImages className="text-6xl text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                      <p className="text-gray-500 group-hover:text-gray-700">
                        Upload from your device
                      </p>
                      Upload more photos
                    </label>
                  </>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="mt-10">
        <h1 className="text-xl mb-2">
          What makes your place attractive and existing
        </h1>
        <div className="flex flex-col gap-5">
          <label htmlFor="Title" className="flex flex-col">
            <span className="text-lg">Title</span>
            <input
              {...register("title", {
                required: "Title is required",
              })}
              type="text"
              placeholder="title"
              className="border-2 border-gray-500 py-2.5 pl-2 rounded-lg"
            />
            {errors.title?.message && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.title.message}
              </p>
            )}
          </label>
          <label htmlFor="Description" className="flex flex-col">
            <span className="text-lg">Description</span>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Description"
              className="border-2 border-gray-500 py-2.5 pl-2 rounded-lg"
            />
            {errors.description?.message && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.description.message}
              </p>
            )}
          </label>
          <label htmlFor="Highlight" className="flex flex-col">
            <span className="text-lg">Highlight</span>
            <input
              type="text"
              {...register("highlight", {
                required: "Highlight is required",
              })}
              placeholder="Highlight"
              className="border-2 border-gray-500 py-2.5 pl-2 rounded-lg"
            />
            {errors.highlight?.message && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.highlight.message}
              </p>
            )}
          </label>

          <label htmlFor="Highlight Details" className="flex flex-col">
            <span className="text-lg">Highlight Details</span>
            <textarea
              {...register("highlightDetails", {
                required: "High light details is required",
              })}
              id="Highlight Details"
              placeholder="Highlight Details"
              className="border-2 border-gray-500 py-2.5 pl-2 rounded-lg"
            />
            {errors.highlightDetails?.message && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.highlightDetails.message}
              </p>
            )}
          </label>
          <label htmlFor="PRICE" className="flex flex-col">
            <span className="text-lg">Now,set your PRICE</span>
            <input
              {...register("price", {
                required: "Price is required",
              })}
              type="number"
              id="PRICE"
              placeholder="$"
              className="border-2 border-gray-500 py-2.5 pl-2 rounded-lg"
            />
            {errors.price?.message && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.price.message}
              </p>
            )}
          </label>
        </div>
      </div>
    </>
  );
};

export default Facilities;
