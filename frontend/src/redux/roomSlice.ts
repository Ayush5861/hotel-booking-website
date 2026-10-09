
import { createSlice } from "@reduxjs/toolkit";
import type { Room } from "../types/room";

interface RoomState {
  rooms: Room[];
}

const initialState: RoomState = {
  rooms: [],
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
    updateRoom: (state, action) => {
      const index = state.rooms.findIndex(
        (room) => room._id === action.payload._id
      );

      if (index !== -1) {
        state.rooms[index] = action.payload;
      }
    },
    deleteRoom: (state, action) => {
      state.rooms = state.rooms.filter(
        (room) => room._id !== action.payload
      );
    },
  },
});

export const { setRooms, addRoom, updateRoom, deleteRoom } = roomSlice.actions;
export default roomSlice.reducer;