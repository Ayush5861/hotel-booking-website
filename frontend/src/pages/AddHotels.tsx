import { useState } from "react";
import type { CreateHotelData } from "../types/hotel";
import { createHotel } from "../services/hotelServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addHotel } from "../redux/hotelSlice";


const AddHotels = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [amenities, setAmenities] = useState("");
        const [formData, setFormData] = useState<CreateHotelData>({
        name: "",
        city: "",
        area: "",
        address: "",
        description: "",
        amenities: [],
    });
   
   const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
        const data = {
            ...formData,
              amenities: amenities
          .split(",")
          .map((item) => item.trim())
        }
        await createHotel(data)
         dispatch(addHotel(data));
          navigate("/hotels");
    }catch(error){
        console.log(error)
    }
  }
  return (
   <>
   <div>
      <h1>Add Hotel</h1>

      <form onSubmit={handleAddHotel}>
        <input
          name="name"
          placeholder="Hotel name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />

        <input
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          placeholder="Amenities: WiFi, Pool, Parking"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
        />

        <button type="submit">
          Add Hotel
        </button>
      </form>
    </div>
  

   </>
  )
}

export default AddHotels