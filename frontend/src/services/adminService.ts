import axiosInterceptor from "../interceptors/axiosInterceptor";
import type { User } from "../types/auth";
import type { Hotel } from "../types/hotel";
import type { HotelBookingsResponse } from "../types/booking";

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axiosInterceptor.get("/admin/users");
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosInterceptor.delete(`/admin/users/${userId}`);
  return response.data;
};

export const getAllHotels = async (): Promise<Hotel[]> => {
  const response = await axiosInterceptor.get("/admin/hotels");
  return response.data;
};

export const deleteHotel = async (hotelId: string) => {
  const response = await axiosInterceptor.delete(`/admin/hotels/${hotelId}`);
  return response.data;
};

export const getHotelWiseBookings = async (
  hotelId: string
): Promise<HotelBookingsResponse> => {
  const response = await axiosInterceptor.get(`/admin/bookings/${hotelId}`);
  return response.data;
};