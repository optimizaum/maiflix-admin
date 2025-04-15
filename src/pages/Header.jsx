import React from "react";
import Logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-3 shadow-md bg-white">
      
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Maiflix" className="w-12 h-auto" />
        <h1 className="text-2xl font-bold text-gray-800">Maiflix</h1>
      </div>      
    </header>
  );
};

export default Header;
