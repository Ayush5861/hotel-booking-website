
import axiosInterceptor from "../interceptors/axiosInterceptor";
import type { CreateBookingData, UpdateBookingData } from "../types/booking";

export const createBooking = async (
  hotelId: string,
  roomId: string,
  data: CreateBookingData
) => {
  const response = await axiosInterceptor.post(
    `/bookings/${hotelId}/${roomId}`,
    data
  );
  return response.data;
};

export const getMyBookings = async () => {
  const response = await axiosInterceptor.get("/bookings/my");
  return response.data;
};

export const getHotelBookings = async (hotelId: string) => {
  const response = await axiosInterceptor.get(`/bookings/hotel/${hotelId}`);
  return response.data;
};

export const getRoomBookings = async (roomId: string) => {
  const response = await axiosInterceptor.get(`/bookings/room/${roomId}`);
  return response.data;
};

export const updateBooking = async (
  bookingId: string,
  data: UpdateBookingData
) => {
  const response = await axiosInterceptor.patch(
    `/bookings/${bookingId}`,
    data
  );
  return response.data;
};

export const changeBookingStatus = async (
  bookingId: string,
  status: "pending" | "confirmed" | "cancelled" | "completed"
) => {
  const response = await axiosInterceptor.patch(
    `/bookings/${bookingId}/status`,
    { status }
  );

  return response.data;
};

export const cancelBooking = async (bookingId: string) => {
  const response = await axiosInterceptor.delete(`/bookings/${bookingId}`);
  return response.data;
};