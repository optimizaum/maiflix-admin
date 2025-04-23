import axios from "axios";
import React from "react";
import { createContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export const MyContext = createContext();
const MyContextProvider = (props) => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [role, setRole] = useState("");
  const [allServices, setAllServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState(null);
  const [showUpdateDetails, setShowUpdateDetails] = useState(false);

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

  const [singleServices, setSingleServices] = useState({});
  const getAllSingleServices = (id) => {
    axios
      .get(`${API_BASE_URL}/service/single/${id}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((result) => {
        console.log("this is result", result);
        const data = result?.data?.data;
        setSingleServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [allServicePackages, setAllServicePackages] = useState([]);

const getAllServicePackages = () => {
  const id = localStorage.getItem("serviceId");
  console.log("---------->", id);

  if (!id) {
    console.error("No service ID found in localStorage");
    return;
  }

  axios
    .get(`${API_BASE_URL}/package/data/${id}`)
    .then((result) => {
      const data = result?.data?.data;
      setAllServicePackages(data);
      console.log("Packages fetched for ID:", id);
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
    singleServices,
    getAllSingleServices,
    allServicePackages,
    getAllServicePackages,
    selectedServices,
    setSelectedServices,
  };
  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  );
};
export default MyContextProvider;
