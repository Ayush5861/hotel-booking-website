import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteHotel, getHotels } from "../services/hotelServices";
import { deleteHotelAction, setHotels } from "../redux/hotelSlice";

import type { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";

const Hotels = () => {
  const dispatch = useDispatch();
  const hotels = useSelector(
    (state: RootState) => state.hotels.hotels
  );
const user = JSON.parse(localStorage.getItem("user") || "null");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getHotels();
        dispatch(setHotels(data));
      } catch (error: any) {
        setError(
          error.response?.data?.message || "Failed to fetch hotels"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [dispatch]);

  if (loading) {
    return <p>Loading hotels...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

 const handleDelete = async (id: string) => {
  try {
    await deleteHotel(id);

    dispatch(deleteHotelAction(id));
  } catch (error: any) {
    setError(
      error.response?.data?.message || "Failed to delete hotel"
    );
  }
};

  return (
    <div>
        <h1>Hotels</h1>
  {hotels.length === 0 && (
  <>
    <p>No hotels found</p>

    {user?.role === "owner" && (
      <button onClick={() => navigate("/owner/add-hotels")}>
        Add hotels
      </button>
    )}
  </>
)}
      
      {hotels.map((hotel) => (
        <div key={hotel._id}>
          <div>
            <h2>{hotel.name}</h2>
            <p>{hotel.city}</p>
            <p>{hotel.area}</p>
            <p>{hotel.address}</p>
            <p>{hotel.description}</p>
            <p>{hotel.amenities.join(" , ")}</p>
          </div>
          <div>
            {user?.role === "owner" && (
              <>
                <button onClick={() => navigate(`/owner/edit-hotels/${hotel._id}`)}>edit</button>
                <button onClick={() => handleDelete(hotel._id)}>delete</button>
                <button onClick={() => navigate(`/owner/hotels/${hotel._id}/rooms`)}>rooms</button>
              </>
            )}
            {user.role === "guest" && (
              <Link to={`/hotels/${hotel._id}/rooms`}>Book rooms</Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hotels;