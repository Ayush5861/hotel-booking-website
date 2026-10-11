import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">
        Hotel Booking
      </h1>

      <h2 className="mb-2 text-xl font-semibold text-gray-700">
        Welcome {user?.name}
      </h2>

      <p className="mb-6 text-gray-500">
        Role: <span className="font-medium capitalize">{user?.role}</span>
      </p>

      {user?.role === "owner" && (
        <button
          onClick={() => navigate("/owner/hotels")}
          className="cursor-pointer rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          My Hotels
        </button>
      )}

      {user?.role === "guest" && (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/hotels")}
            className="cursor-pointer rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            Browse Hotels
          </button>

          <button
            onClick={() => navigate("/bookings")}
            className="cursor-pointer rounded-lg bg-gray-700 px-5 py-3 text-white transition hover:bg-gray-800"
          >
            My Bookings
          </button>
        </div>
      )}

      {user?.role === "admin" && (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/admin/users")}
            className="cursor-pointer rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            Manage Users
          </button>

          <button
            onClick={() => navigate("/admin/hotels")}
            className="cursor-pointer rounded-lg bg-green-600 px-5 py-3 text-white transition hover:bg-green-700"
          >
            Manage Hotels
          </button>

          <button
            onClick={() => navigate("/admin/bookings")}
            className="cursor-pointer rounded-lg bg-gray-700 px-5 py-3 text-white transition hover:bg-gray-800"
          >
            Manage Bookings
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;