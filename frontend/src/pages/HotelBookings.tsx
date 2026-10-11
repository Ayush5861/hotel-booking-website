
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import { changeBookingStatus, getHotelBookings } from "../services/bookingServices";
import { setBookings, updateBooking } from "../redux/bookingSlice";

const HotelBookings = () => {
  const { hotelId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const bookings = useSelector(
    (state: RootState) => state.bookings.bookings
  );

  const [error, setError] = useState("");

  useEffect(() => {
    if (!hotelId) return;

    const loadBookings = async () => {
      try {
        const data = await getHotelBookings(hotelId);
        dispatch(setBookings(data));
      } catch (error: any) {
        setError(
          error.response?.data?.message || "Failed to load hotel bookings"
        );
      }
    };

    loadBookings();
  }, [hotelId, dispatch]);

  const handleChangeStatus = async (
  bookingId: string,
  status: "confirmed" | "cancelled"
) => {
  try {
    const updatedBooking = await changeBookingStatus(bookingId, status);
    dispatch(updateBooking(updatedBooking));
  } catch (error: any) {
    setError(
      error.response?.data?.message || "Failed to change booking status"
    );
  }
};

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hotel Bookings</h1>

        <button
          onClick={() => navigate("/owner/hotels")}
          className="rounded bg-gray-600 px-4 py-2 text-white"
        >
          Back to Hotels
        </button>
      </div>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      {bookings.length === 0 ? (
        <p>No bookings found for this hotel.</p>
      ) : (
        <>
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="rounded-lg border p-4">
              <h2 className="text-lg font-semibold">{booking.name}</h2>
              <p>Check-in: {booking.checkIn.slice(0, 10)}</p>
              <p>Check-out: {booking.checkOut.slice(0, 10)}</p>
              <p>Guests: {booking.guests}</p>
              <p>Total price: ₹{booking.totalPrice}</p>
              <p>
                Status:{" "}
                <span className="capitalize">{booking.status}</span>
              </p>
              {booking.status === "pending" && (
  <div className="mt-3 flex gap-3">
    <button
      onClick={() => handleChangeStatus(booking._id, "confirmed")}
      className="rounded bg-green-600 px-3 py-2 text-white"
    >
      Confirm
    </button>

    <button
      onClick={() => handleChangeStatus(booking._id, "cancelled")}
      className="rounded bg-red-600 px-3 py-2 text-white"
    >
      Cancel Booking
    </button>
  </div>
)}
            </div>
            
          ))}
          
        </div>
        </>
      )}
    </div>
  );
};

export default HotelBookings;

