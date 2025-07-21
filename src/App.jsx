import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
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
import { MyContext } from "./context/MyContext";
import DashBoard from "./component/DashBoard";
import Testimonials from "./component/Testimonials/Testimonials";
import Transaction from "./component/Transaction/Transaction";
import Membership from "./component/Membership/Membership";
import ServicesDetails from "./component/services/servicesDetails/ServicesDetails";
function App() {
  const { role, setRole, navigate } = useContext(MyContext);
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  // console.log(token);

  useEffect(() => {
    if (token) {
      setRole("admin");
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      if (pathname === "/login") {
        navigate("/");
      } else {
        navigate(pathname);
      }
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <section>
        {role === "admin" ? (
          <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <div className="flex-1 ">
                <Routes>
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/membership" element={<Membership/>}/>
                  <Route path="/services" element={<Services />} />
                  <Route path="/packages" element={<ServicePackage />} />
                  <Route path="/slot" element={<Slot />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/transactions" element={<Transaction />} />
                  <Route path="/users" element={<User />} />
                  <Route path="/bookings" element={<Booking />} />
                  <Route path="/booking-details" element={<BookingDetails />} />
                  <Route path="/details" element={<ServicesDetails />} />

                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
