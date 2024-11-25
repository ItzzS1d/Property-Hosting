import { type ChangeEvent, type MouseEvent, useState } from "react";
import { useModal } from "../../contexts/ModelsContext";
import { SubmitHandler, useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { handleRegister } from "../../lib/api-client";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
}

const RegisterModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>("");
  const [image, setImage] = useState<File | null>(null);
  const { openLoginModal, closeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const handleFormSubmit: SubmitHandler<RegisterFormData> = async (
    formData
  ) => {
    setLoading(true);
    const payload: FormData = new FormData();
    payload.append("email", formData.email);
    payload.append("password", formData.password);
    payload.append("firstName", formData.firstName);
    payload.append("lastName", formData.lastName);
    if (image) {
      payload.append("image", image);
    }

    try {
      await handleRegister(payload);
      closeModal();
    } catch (error: unknown) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleModalClose = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.id === "wrapper") {
      closeModal();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      setImage(target.files[0]);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center"
      id="wrapper"
      onClick={handleModalClose}
    >
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white rounded-lg lg:w-1/3 p-6 max-h-[80%] overflow-y-scroll"
      >
        <div className="mb-5 border-b-2 flex items-center">
          <button
            className="text-xl hover:bg-gray-200 rounded-full"
            onClick={closeModal}
          >
            <CloseIcon />
          </button>
          <h3 className="text-center text-xl pb-3 justify-self-center">
            Register
          </h3>
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="firstName"
          >
            First name
          </label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", {
              required: "First name is required",
            })}
            placeholder="First name"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.firstName && (
            <p className="text-red-500 font-semibold text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="lastName"
          >
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", {
              required: "Last name is required",
            })}
            placeholder="Last name"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.lastName && (
            <p className="text-red-500 font-semibold text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim,
                message: "Enter valid email address",
              },
            })}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 font-semibold text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="Password"
          >
            Password
          </label>
          <div className="flex items-center border mb-1 rounded-lg transition-all duration-300">
            <input
              type="password"
              id="Password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full px-4 py-3 border-none rounded-lg focus:outline-none"
            />
            <div className="pr-2">Show/Hide</div>
          </div>
          {errors.password && (
            <p className="text-red-500 font-semibold text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col  items-center">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="image"
          >
            {image ? (
              <img src={URL.createObjectURL(image)} width={200} />
            ) : (
              <CloudUploadIcon className="w-[200px]" />
            )}
          </label>
          <div className="flex items-center border mb-1 rounded-lg transition-all duration-300">
            <input
              type="file"
              accept="image/*"
              id="image"
              hidden
              {...register("image", { required: "Image is required" })}
              onChange={handleImageChange}
              placeholder="Image"
              className="w-full px-4 py-3 border-none rounded-lg focus:outline-none"
            />
          </div>
          {errors.image && (
            <p className="text-red-500 font-semibold text-sm mt-1">
              {errors.image.message}
            </p>
          )}
        </div>

        <Button
          element="button"
          disabled={loading}
          className="mt-4 text-white bg-[#FF5A5F] px-4 py-3 rounded w-full"
        >
          {loading ? <Spinner /> : "Register"}
        </Button>
        <button
          type="button"
          className="mt-4 font-medium px-4 py-3 rounded w-full border border-black"
        >
          Continue with Facebook
        </button>
        <button
          type="button"
          className="mt-4 font-medium px-4 py-3 rounded w-full border border-black"
        >
          Continue with Github
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <button
            className="underline text-blue-500 font-semibold"
            onClick={openLoginModal}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterModal;
