import { createSlice } from "@reduxjs/toolkit";
import type { Booking } from "../types/booking";

interface BookingState {
  bookings: Booking[];
}

const initialState: BookingState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex(
        (booking) => booking._id === action.payload._id
      );

      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking._id !== action.payload
      );
    },
  },
});

export const {
  setBookings,
  addBooking,
  updateBooking,
  deleteBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;