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
  const [showUpdateDetails, setShowUpdateDetails] = useState(false);
  const [alltestimonials, setAllTestimonials]=useState([]);
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
  // ----------testimonials--------
  const fetchTestimonials = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/testimonial`, {
            headers: { Authorization: `${localStorage.getItem("token")}` },
        });
        setAllTestimonials(response?.data?.data);
        console.log("response", response);
    } catch (error) {
        console.error("error", error);
    }
}

  const value = {
    API_BASE_URL,
    role,
    setRole,
    navigate,
    allServices,
    getAllServices,
    singleServices,
    getAllSingleServices,
    alltestimonials,
    fetchTestimonials
  };
  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  );
};
export default MyContextProvider;
