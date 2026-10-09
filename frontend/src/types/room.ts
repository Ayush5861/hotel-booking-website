
export interface CreateRoomData {
  type: string;
  capacity: number;
  pricePerNight: number;
  count: number;
}

export interface UpdateRoomData {
  type?: string;
  capacity?: number;
  pricePerNight?: number;
  count?: number;
}

export interface Room extends CreateRoomData {
  _id: string;
  hotelId: string;
}