import { UserSchemaTypes } from "./../../../backend/src/models/userModel";
import { ListingSchemaTypes } from "./../../../backend/src/models/listingsModel";
export interface SignInResponse {
  success: boolean;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    propertyList: string[];
    reservationList: string[];
    tripList: string[];
    wishList: string[];
    email: string;
    createdAt: Date;
    profilePic: string;
  };
}
type RegisterTypes = {
  success: boolean;
  message: string;
};
type LoginTypes = {
  success: boolean;
} & UserSchemaTypes;
type LoginPayLoad = {
  email: string;
  password: string;
};
interface ListingsType {
  success: boolean;
  listings: ListingSchemaTypes;
}

export const handleRegister = async (
  formData: FormData
): Promise<RegisterTypes> => {
  const response = await fetch("http://localhost:3000/api/v1/users/register", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};

export const handleLogin = async (
  formData: LoginPayLoad
): Promise<LoginTypes> => {
  const response = await fetch("http://localhost:3000/api/v1/users/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to login");
  return data;
};

export const handleCreatingListing = async (
  formData: FormData
): Promise<RegisterTypes> => {
  const response = await fetch("http://localhost:3000/api/v1/listings", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  console.log(data);
  if (!response.ok) throw new Error(data.error || "Failed to create listing");
  return data;
};

export const fetchListings = async (
  category: string
): Promise<ListingsType> => {
  const response = await fetch(
    `http://localhost:3000/api/v1/listings?category=${category}`
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};

export const fetchListing = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/v1/listings/${id}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};
export const getCurrentUser = async (): Promise<SignInResponse> => {
  const res = await fetch(`http://localhost:3000/api/v1/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch");
  }

  return data;
};

export const handleLogout = async (): Promise<void> => {
  const response = await fetch("http://localhost:3000/api/v1/users/logout", {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  await response.json();
  if (!response.ok) throw new Error("Failed to logout");
  window.location.reload();
};

export const handleListingBooking = async (bookingData: {
  bookingData: {
    hostId: string;
    listingId: string;
    startDate: string;
    endDate: string;
    totalPrice: string;
  };
}): Promise<void> => {
  const response = await fetch("http://localhost:3000/api/v1/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(bookingData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};
export const fetchCurrentUserBookings = async (): Promise<void> => {
  const response = await fetch("http://localhost:3000/api/v1/bookings", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};
