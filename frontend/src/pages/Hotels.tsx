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
   const [search, setSearch] = useState("");
   
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getHotels(search);
        dispatch(setHotels(data));
      } catch (error: any) {
        setError(error.response?.data?.message || "Failed to fetch hotels");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [dispatch,search]);

  if (loading) {
    return <p className="p-6 text-gray-600">Loading hotels...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }
  const handleDelete = async (id: string) => {
    try {
      await deleteHotel(id);
      dispatch(deleteHotelAction(id));
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to delete hotel");
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Hotels</h1>

        {user?.role === "owner" && (
          <button
            onClick={() => navigate("/owner/add-hotels")}
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add Hotel
          </button>
        )}
      </div>

      {hotels.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <p className="mb-4 text-gray-500">No hotels found</p>

          {user?.role === "owner" && (
            <button
              onClick={() => navigate("/owner/add-hotels")}
              className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Add Hotel
            </button>
          )}
        </div>
      )}


      <input
        type="text"
        placeholder="Search by hotel name, city, area, or amenities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div>
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                {hotel.name}
              </h2>
              <p className="text-sm text-gray-600">
                {hotel.city}, {hotel.area}
              </p>
              <p className="mt-1 text-sm text-gray-500">{hotel.address}</p>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                {hotel.description}
              </p>

              <p className="mt-3 text-sm text-gray-600">
                <span className="font-semibold">Amenities:</span>{" "}
                {hotel.amenities.join(", ")}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
              {user?.role === "owner" && (
                <>
                  <button
                    onClick={() =>
                      navigate(`/owner/edit-hotels/${hotel._id}`)
                    }
                    className="cursor-pointer rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(hotel._id)}
                    className="cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/owner/hotels/${hotel._id}/rooms`)
                    }
                    className="cursor-pointer rounded-md bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-800"
                  >
                    Rooms
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/owner/hotels/${hotel._id}/bookings`)
                    }
                    className="cursor-pointer rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
                  >
                    Bookings
                  </button>
                </>
              )}

              {user?.role === "guest" && (
                <Link
                  to={`/hotels/${hotel._id}/rooms`}
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  Book Rooms
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;