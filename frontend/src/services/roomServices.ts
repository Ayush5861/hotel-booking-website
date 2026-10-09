
import axiosInterceptor from "../interceptors/axiosInterceptor";
import type { CreateRoomData, UpdateRoomData } from "../types/room";

export const getRooms = async (hotelId: string) => {
  const response = await axiosInterceptor.get(`/rooms/${hotelId}`);
  return response.data;
};

export const getRoomById = async (roomId: string) => {
  const response = await axiosInterceptor.get(`/rooms/detail/${roomId}`);
  return response.data;
};

export const createRoom = async (
  hotelId: string,
  data: CreateRoomData
) => {
  const response = await axiosInterceptor.post(`/rooms/${hotelId}`, data);
  return response.data;
};

export const updateRoom = async (
  roomId: string,
  data: UpdateRoomData
) => {
  const response = await axiosInterceptor.patch(`/rooms/${roomId}`, data);
  return response.data;
};

export const deleteRoom = async (roomId: string) => {
  const response = await axiosInterceptor.delete(`/rooms/${roomId}`);
  return response.data;
};