
import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking } from "../services/bookingServices";

const AddBookings = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hotelId || !roomId) {
      setError("Hotel or room ID is missing");
      return;
    }

    if (checkIn >= checkOut) {
      setError("Check-out must be after check-in");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createBooking(hotelId, roomId, {
        name,
        checkIn,
        checkOut,
        guests,
      });

      navigate("/bookings");
    } catch {
      setError("Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-6 text-2xl font-bold">Add Booking</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">Check-in</label>
          <input
            type="date"
            value={checkIn}
            min={new Date().toLocaleDateString("en-CA")}
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
            min={checkIn || new Date().toLocaleDateString("en-CA")}
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
          {loading ? "Creating..." : "Create Booking"}
        </button>
      </form>
    </div>
  );
};

export default AddBookings;