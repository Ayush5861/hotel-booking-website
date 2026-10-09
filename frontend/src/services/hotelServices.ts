
import axiosInterceptor from "../interceptors/axiosInterceptor";
import type {
  CreateHotelData,
  UpdateHotelData,
} from "../types/hotel";

export const getHotels = async () => {
  const response = await axiosInterceptor.get("/hotels");
  return response.data;
};

export const getHotelById = async (id: string) => {
  const response = await axiosInterceptor.get(`/hotels/${id}`);
  return response.data;
};

export const createHotel = async (data: CreateHotelData) => {
  const response = await axiosInterceptor.post("/hotels", data);
  return response.data;
};

export const updateHotel = async (
  id: string,
  data: UpdateHotelData
) => {
  const response = await axiosInterceptor.patch(`/hotels/${id}`, data);
  return response.data;
};

export const deleteHotel = async (id: string) => {
  const response = await axiosInterceptor.delete(`/hotels/${id}`);
  return response.data;
};