import {useNavigate } from "react-router-dom";
const Home = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
const navigate = useNavigate();

  return (
    <div>
      <h1>Hotel Booking</h1>

      <h2>Welcome {user?.name}</h2>
      <p>Role: {user?.role}</p>
     {user?.role === "owner" &&
      ( <button onClick={() => navigate("/owner/hotels")} className="cursor-pointer" > My hotels </button>
     )}
      {user?.role === "guest" &&
       ( <button onClick={() => navigate("/hotels")}
        className="cursor-pointer" > Browse Hotels </button>
         )}

      
    </div>
  );
};

export default Home;