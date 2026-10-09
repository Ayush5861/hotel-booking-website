import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch } from "../redux/store";
import { updateRoom as updateRoomAction } from "../redux/roomSlice";
import { getRoomById, updateRoom } from "../services/roomServices";

const EditRoom = () => {
const { roomId } = useParams();
const dispatch = useDispatch<AppDispatch>();
const navigate = useNavigate();

const [formData, setFormData] = useState({
type: "",
capacity: 1,
pricePerNight: 0,
count: 1,
});

const [hotelId, setHotelId] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(true);

useEffect(() => {
if (!roomId) {
setError("Room ID is missing");
setLoading(false);
return;
}


const loadRoom = async () => {
  try {
    const room = await getRoomById(roomId);

    setFormData({
      type: room.type,
      capacity: room.capacity,
      pricePerNight: room.pricePerNight,
      count: room.count,
    });

    setHotelId(room.hotelId);
  } catch (error: any) {
    setError(error.response?.data?.message || "Failed to load room");
  } finally {
    setLoading(false);
  }
};

loadRoom();


}, [roomId]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;


setFormData({
  ...formData,
  [name]: name === "type" ? value : Number(value),
});


};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
setError("");


if (!roomId) {
  setError("Room ID is missing");
  return;
}

try {
  const updatedRoom = await updateRoom(roomId, formData);
  dispatch(updateRoomAction(updatedRoom));
  navigate(`/owner/hotels/${hotelId}/rooms`);
} catch (error: any) {
  setError(error.response?.data?.message || "Failed to update room");
}
};

if (loading) {
return <p className="p-6">Loading room...</p>;
}

return ( <div className="max-w-xl mx-auto p-6"> <h1 className="text-2xl font-bold mb-6">Edit Room</h1>

  {error && <p className="text-red-600 mb-4">{error}</p>}

  <form onSubmit={handleSubmit} className="grid gap-4">
    <input
      name="type"
      value={formData.type}
      onChange={handleChange}
      placeholder="Room type"
      className="border p-2 rounded"
      required
    />

    <input
      name="capacity"
      type="number"
      min="1"
      value={formData.capacity}
      onChange={handleChange}
      className="border p-2 rounded"
      required
    />

    <input
      name="pricePerNight"
      type="number"
      min="0"
      value={formData.pricePerNight}
      onChange={handleChange}
      className="border p-2 rounded"
      required
    />

    <input
      name="count"
      type="number"
      min="1"
      value={formData.count}
      onChange={handleChange}
      className="border p-2 rounded"
      required
    />

    <button
      type="submit"
      className="bg-blue-600 text-white p-2 rounded"
    >
      Update Room
    </button>
  </form>
</div>


);
};

export default EditRoom;
