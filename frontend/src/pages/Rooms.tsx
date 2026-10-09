
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import { getRooms, deleteRoom as deleteRoomApi } from "../services/roomServices";
import { setRooms, deleteRoom as deleteRoomAction } from "../redux/roomSlice";

const Rooms = () => {
  const { hotelId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  useEffect(() => {
    if (!hotelId) return;
    
    const loadRooms = async () => {
      try {
        const data = await getRooms(hotelId);
        dispatch(setRooms(data));
      } catch (error: any) {
        setError(error.response?.data?.message || "Failed to load rooms");
      }
    };

    loadRooms();
  }, [hotelId, dispatch]);

  const handleDelete = async (roomId: string) => {
    try {
      await deleteRoomApi(roomId);
      dispatch(deleteRoomAction(roomId));
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to delete room");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rooms</h1>
        {
        user.role === "owner" && (
            <>
             <button
          onClick={() => navigate(`/owner/hotels/${hotelId}/add-room`)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Room
        </button>
            </>
        )
        }
       
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {rooms.length === 0 ? (
        <p>No rooms found for this hotel.</p>
      ) : (
        <div className="grid gap-4">
          {rooms.map((room) => (
            <div key={room._id} className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold">{room.type}</h2>
              <p>Capacity: {room.capacity} guests</p>
              <p>Price per night: ₹{room.pricePerNight}</p>
              <p>Rooms available : {room.count}</p>

              <div className="flex gap-3 mt-4">
                {
                    user.role === "owner" && (
                        <>
                         <button
                  onClick={() => navigate(`/owner/rooms/edit/${room._id}`)}
                  className="bg-yellow-500 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
                        </>
                    )
                }

                {
                    user.role === "guest" && (
                        <>
                        <button>Book</button>
                        </>
                    )
                }
               
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;