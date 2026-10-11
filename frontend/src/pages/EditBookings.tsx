
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMyBookings,
  updateBooking,
} from "../services/bookingServices";
import type { Booking } from "../types/booking";

const EditBookings = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookings: Booking[] = await getMyBookings();
        const found = bookings.find((item) => item._id === bookingId);

        if (!found) {
          setError("Booking not found");
          return;
        }

        setBooking(found);
        setCheckIn(found.checkIn.slice(0, 10));
        setCheckOut(found.checkOut.slice(0, 10));
        setGuests(found.guests);
      } catch {
        setError("Failed to load booking");
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bookingId || !booking) return;

    if (checkIn >= checkOut) {
      setError("Check-out must be after check-in");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await updateBooking(bookingId, {
        checkIn,
        checkOut,
        guests,
      });

      navigate("/bookings");
    } catch {
      setError("Failed to update booking");
    } finally {
      setLoading(false);
    }
  };

  if (!booking && !error) {
    return <p className="p-6">Loading booking...</p>;
  }

  if (!booking) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-6 text-2xl font-bold">Edit Booking</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block">Name</label>
          <input
            value={booking.name}
            disabled
            className="w-full rounded border bg-gray-100 p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">Guests</label>
          <input
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Booking"}
        </button>
      </form>
    </div>
  );
};

export default EditBookings;