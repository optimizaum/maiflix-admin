import React from "react";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter here

import "./App.css";
import Sidebar from "./pages/Sidebar";
import Header from "./pages/Header";
import Services from "./component/services/servicesDetails/Services";
import ServicePackage from "./component/services/packages/ServicePackage";
import Slot from "./component/services/slot/Slot";
import Login from "./pages/Login"; 
import User from "./component/services/User";
import Booking from "./component/services/bookings/Booking"; 
import BookingDetails from "./component/services/bookings/BookingDetails";
function App() {
  return (
    <>
   
    <div className="flex flex-col h-screen">
      
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 ">
          <Routes> 
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<ServicePackage />} />
            <Route path="/slot" element={<Slot />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/users" element={<User/>}/>
            <Route path="/bookings" element={<Booking/>}/>
            <Route path="/booking-details" element={<BookingDetails/>}/>
          </Routes>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
