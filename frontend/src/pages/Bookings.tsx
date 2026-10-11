
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import {
  getMyBookings,
  cancelBooking as cancelBookingApi,
} from "../services/bookingServices";
import {
  setBookings,
  updateBooking,
} from "../redux/bookingSlice";

const Bookings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const bookings = useSelector(
    (state: RootState) => state.bookings.bookings
  );
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await getMyBookings();
        dispatch(setBookings(data));
      } catch (error: any) {
        setError(
          error.response?.data?.message || "Failed to load bookings"
        );
      }
    };

    loadBookings();
  }, [dispatch]);

  const handleCancel = async (bookingId: string) => {
    try {
      await cancelBookingApi(bookingId);

      const booking = bookings.find((item) => item._id === bookingId);

      if (booking) {
        dispatch(updateBooking({ ...booking, status: "cancelled" }));
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Failed to cancel booking"
      );
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Bookings</h1>
      </div>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="rounded-lg border p-4">
              <h2 className="text-lg font-semibold">{booking.name}</h2>
              <p>Check-in: {booking.checkIn.slice(0, 10)}</p>
              <p>Check-out: {booking.checkOut.slice(0, 10)}</p>
              <p>Guests: {booking.guests}</p>
              <p>Total price: ₹{booking.totalPrice}</p>
              <p>
                Status: <span className="capitalize">{booking.status}</span>
              </p>

              <div className="mt-4 flex gap-3">
                {user?.role === "guest" &&
                  booking.status !== "cancelled" &&
                  booking.status !== "completed" && (
                    <>
                      <button
                        onClick={() =>
                          navigate(`/bookings/edit/${booking._id}`)
                        }
                        className="rounded bg-yellow-500 px-3 py-1"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="rounded bg-red-600 px-3 py-1 text-white"
                      >
                        Cancel
                      </button>
                    </>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;