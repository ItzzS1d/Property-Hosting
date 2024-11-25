import { type MouseEvent, useState } from "react";
import { useModal } from "../../contexts/ModelsContext";
import { useForm, SubmitHandler } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../ui/Button";
import { handleLogin } from "../../lib/api-client";
import Spinner from "../ui/Spinner";
import { useAuth } from "../../contexts/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}
const LoginModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>("");
  const { closeModal, openRegisterModal } = useModal();
  const { setUserInfo } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const handleModalClose = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.id === "wrapper") {
      closeModal();
    }
  };

  const handleFormSubmit: SubmitHandler<LoginFormData> = async (formData) => {
    setLoading(true);
    try {
      const data = await handleLogin(formData);
      if (data.success) {
        window.location.reload();
        closeModal();
      }
    } catch (error: unknown) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center"
      id="wrapper"
      onClick={handleModalClose}
    >
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white rounded-lg lg:w-1/3 p-6"
      >
        <div className="mb-5 border-b-2">
          <span
            className="absolute mt-1 text-xl hover:bg-gray-200 rounded-full"
            onClick={closeModal}
          >
            <CloseIcon />
          </span>
          <h3 className="h5 text-center text-xl pb-3">Login</h3>
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
          {typeof error === "string" && (
            <p className="text-red-500 font-semibold text-sm mt-1">{error}</p>
          )}
        </div>

        <button
          disabled={loading}
          className=" mt-4 text-white bg-[#FF5A5F]  px-4 py-3 rounded w-full flex justify-center"
        >
          {loading ? <Spinner /> : "Login"}
        </button>
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
            type="button"
            onClick={openRegisterModal}
            className="underline text-blue-500 font-semibold"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginModal;
