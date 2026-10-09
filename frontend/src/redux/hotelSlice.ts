import { createSlice } from "@reduxjs/toolkit";
import type { Hotel } from "../types/hotel";

interface HotelState {
  hotels: Hotel[];
}

const initialState: HotelState = {
  hotels: [],
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },

    addHotel: (state, action) => {
      state.hotels.push(action.payload);
    },

    updateHotel: (state, action) => {
      const index = state.hotels.findIndex(
        (hotel) => hotel._id === action.payload._id
      );

      if (index !== -1) {
        state.hotels[index] = action.payload;
      }
    },

    deleteHotelAction: (state, action) => {
      state.hotels = state.hotels.filter(
        (hotel) => hotel._id !== action.payload
      );
    },
  },
});

export const {
  setHotels,
  addHotel,
  updateHotel,
  deleteHotelAction,
} = hotelSlice.actions;

export default hotelSlice.reducer;