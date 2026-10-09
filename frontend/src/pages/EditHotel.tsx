import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { CreateHotelData } from "../types/hotel";
import { getHotelById, updateHotel } from "../services/hotelServices";
import { updateHotel as updateHotelAction } from "../redux/hotelSlice";

const EditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [amenities, setAmenities] = useState("");

  const [formData, setFormData] = useState<CreateHotelData>({
    name: "",
    city: "",
    area: "",
    address: "",
    description: "",
    amenities: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) return;

      try {
        const hotel = await getHotelById(id);

        setFormData({
          name: hotel.name,
          city: hotel.city,
          area: hotel.area,
          address: hotel.address,
          description: hotel.description,
          amenities: hotel.amenities,
        });

        setAmenities(hotel.amenities.join(", "));
      } catch (error: any) {
        setError(
          error.response?.data?.message || "Failed to fetch hotel"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditHotel = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    try {
      const data = {
        ...formData,
        amenities: amenities
          .split(",")
          .map((item) => item.trim())
      };

      const hotel = await updateHotel(id, data);

      dispatch(updateHotelAction(hotel));

      navigate("/hotels");
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Failed to update hotel"
      );
    }
  };

  if (loading) {
    return <p>Loading hotel...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Edit Hotel</h1>

      <form onSubmit={handleEditHotel}>
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
          Update Hotel
        </button>
      </form>
    </div>
  );
};

export default EditHotel;