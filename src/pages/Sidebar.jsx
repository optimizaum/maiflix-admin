import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { TbBrandBooking } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { SiGoogleanalytics } from "react-icons/si";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-60 h-screen bg-[#c95203e8] overflow-y-auto font-semibold text-white text-md flex flex-col p-4 shadow-lg [&::-webkit-scrollbar]:hidden">
      <nav className="flex flex-col gap-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
            }`
          }>
          <MdDashboard /> Dashboard
        </NavLink>

        <NavLink
          to="/services"
          className={() =>
            `flex items-center gap-3 p-3 rounded-lg ${
              location.pathname.startsWith("/services") ||location.pathname.startsWith("/packages") || location.pathname.startsWith("/slot") 
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
            }`
          }
        >
          <GrServices /> Services
        </NavLink>

        <NavLink 
          to="/bookings"  
          className={() => 
            `flex items-center gap-3 p-3 rounded-lg ${
              location.pathname.startsWith("/bookings")  || location.pathname.startsWith("/booking-details")? "bg-white text-black" : "hover:bg-white hover:text-black"
            }`
          }>
          <TbBrandBooking /> Bookings
        </NavLink>

        <NavLink 
          to="/users" 
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
            }`
          }>
          <FaUsers /> User
        </NavLink>

        <NavLink 
          to="/employees" 
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
            }`
          }>
          <HiUsers /> Employee
        </NavLink>

        <NavLink 
          to="/notifications" 
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
            }`
          }>
          <IoMdNotifications /> Notifications
        </NavLink>

        <NavLink 
          to="/transactions" 
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
            }`
          }>
          <GrTransaction /> Transactions
        </NavLink>

        <NavLink 
          to="/analytics" 
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
            }`
          }>
          <SiGoogleanalytics /> Analytics
        </NavLink>

        <NavLink 
          to="/support" 
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
            }`
          }>
          <MdOutlineSupportAgent /> Support
        </NavLink>

        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
            }`
          }>
          <IoSettings /> Settings
        </NavLink>

        <NavLink 
          to="/logout" 
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
            }`
          }>
          <IoMdLogOut /> Logout
        </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;
