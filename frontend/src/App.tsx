import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Protected from "./components/Protected";
import Hotels from "./pages/Hotels";
import AddHotels from "./pages/AddHotels";
import Navbar from "./components/Navbar";
import EditHotel from "./pages/EditHotel";
import Rooms from "./pages/Rooms";
import EditRoom from "./pages/EditRoom";
import AddRoom from "./pages/AddRoom";

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
  path="/hotels"
  element={
    <Protected role="guest">
      <Hotels />
    </Protected>
  }
/>
          <Route
          path="/owner/hotels"
          element={
            <Protected role = 'owner'>
              <Hotels />
            </Protected>
          }
        />
             <Route
          path="/owner/add-hotels"
          element={
            <Protected role = 'owner'>
              <AddHotels />
            </Protected>
          }
        />
        <Route
  path="/owner/edit-hotels/:id"
  element={
    <Protected role = 'owner'>
      <EditHotel />
    </Protected>
  }
/>
<Route
  path="/hotels/:hotelId/rooms"
  element={
    <Protected role="guest">
      <Rooms />
    </Protected>
  }
/>
<Route
  path="/owner/hotels/:hotelId/rooms"
  element={
    <Protected role="owner">
      <Rooms />
    </Protected>
  }
/>
<Route
  path="/owner/hotels/:hotelId/add-room"
  element={
    <Protected role="owner">
      <AddRoom />
    </Protected>
  }
/>

<Route
  path="/owner/rooms/edit/:roomId"
  element={
    <Protected role="owner">
      <EditRoom />
    </Protected>
  }
/>
      </Routes>
      
    </BrowserRouter>
    </>
  );
}

export default App;