import axios from "axios";
import React from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const MyContext = createContext();
const MyContextProvider = (props) => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [role, setRole] = useState("");
  const [allServices, setAllServices] = useState([]);
  const getAllServices = () => {
    axios
      .get(`${API_BASE_URL}/service/get-all-service`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((result) => {
        console.log(result);
        const data = result?.data?.data;
        setAllServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const value = {
    API_BASE_URL,
    role,
    setRole,
    navigate,
    allServices,
    getAllServices,
  };
  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  );
};
export default MyContextProvider;
