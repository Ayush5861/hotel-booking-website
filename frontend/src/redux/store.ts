import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotelSlice";
import roomReducer from "./roomSlice";
export const store = configureStore({
  reducer: {
    hotels: hotelReducer,
    rooms : roomReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;