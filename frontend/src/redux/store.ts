import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotelSlice";
import roomReducer from "./roomSlice";
import bookingReducer from "./bookingSlice";
export const store = configureStore({
  reducer: {
    hotels: hotelReducer,
    rooms : roomReducer,
     bookings: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;