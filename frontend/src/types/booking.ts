
export interface Booking {
  _id: string;
  hotelId: string;
  roomId: string;
  guestId: string;
  name: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt?: string;
}

export interface CreateBookingData {
  name: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface UpdateBookingData {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export interface HotelBookingsResponse {
  hotelName: string;
  bookings: Booking[];
}