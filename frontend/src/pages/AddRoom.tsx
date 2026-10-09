import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch } from "../redux/store";
import { addRoom } from "../redux/roomSlice";
import { createRoom } from "../services/roomServices";

const AddRoom = () => {
const { hotelId } = useParams();
const dispatch = useDispatch<AppDispatch>();
const navigate = useNavigate();

const [formData, setFormData] = useState({
type: "",
capacity: 1,
pricePerNight: 0,
count: 1,
});

const [error, setError] = useState("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;


setFormData({
  ...formData,
  [name] : value
});


};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
setError("");


if (!hotelId) {
  setError("Hotel ID is missing");
  return;
}

try {
  const room = await createRoom(hotelId, formData);
  dispatch(addRoom(room));
  navigate(`/owner/hotels/${hotelId}/rooms`);
} catch (error: any) {
  setError(error.response || "Failed to add room");
}
};

return ( <div className="max-w-xl mx-auto p-6"> <h1 className="text-2xl font-bold mb-6">Add Room</h1>
  {error && <p className="text-red-600 mb-4">{error}</p>}

  <form onSubmit={handleSubmit} className="grid gap-4">
    <label>type</label>
    <input
      name="type"
      value={formData.type}
      onChange={handleChange}
      placeholder="Room type"
      className="border p-2 rounded"
      required
    />
    <label>capacity</label>
    <input
      name="capacity"
      type="number"
      min="1"
      value={formData.capacity}
      onChange={handleChange}
      placeholder="Capacity"
      className="border p-2 rounded"
      required
    />
    <label>pricePerNight</label>
    <input
      name="pricePerNight"
      type="number"
      min="0"
      value={formData.pricePerNight}
      onChange={handleChange}
      placeholder="Price per night"
      className="border p-2 rounded"
      required
    />
    <label>Room available</label>
    <input
      name="count"
      type="number"
      min="1"
      value={formData.count}
      onChange={handleChange}
      placeholder="Number of rooms"
      className="border p-2 rounded"
      required
    />
    <button
      type="submit"
      className="bg-blue-600 text-white p-2 rounded"
    >
      Add Room
    </button>
  </form>
</div>
);
};

export default AddRoom;
