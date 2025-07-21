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
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedTestimonialId, setSelectedTestimonialId] = useState(null);
  const [alltestimonials, setAllTestimonials] = useState([]);



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

  // ----------testimonials--------
  const fetchTestimonials = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(`${API_BASE_URL}admin/getAll-testimonial`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response testimonial", response);
      setAllTestimonials(response?.data?.data);

    } catch (error) {
      console.error("error", error);
    }
  }

  // -------------membership details-------------------
  const [membership, setmembership] = useState([])
  const fetchMembership = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}admin/all-form`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      setmembership(response?.data?.data);
      // console.log("membership response ", response);
    } catch (error) {
      console.error("error", error);
    }
  }
 



    const [services,setServices]=useState([])
    const getAllServices=async(req,res)=>{
      await axios.get(`${API_BASE_URL}admin/services`,{
          headers:{
            Authorization:` Bearer ${localStorage.getItem("token")}`
          }
      })
      .then((response)=>{
        console.log(response?.data,"fetching detail of all the services")
        setServices(response?.data?.service)

      })
      .catch((error)=>{
             console.log("Error while fetching the  serives:",error)
      })
    }


  const value = {
    API_BASE_URL,
    role,
    setRole,
    navigate,
    allServices,
    getAllServices,
   

    allServicePackages,
    getAllServicePackages,
    selectedServices,
    setSelectedServices,

    alltestimonials,
    fetchTestimonials,
    membership,
    fetchMembership,
  

    setSelectedMemberId,
    selectedMemberId    
    , selectedTestimonialId,
    setSelectedTestimonialId,
    getAllServices,
    services


  };
  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  );
};
export default MyContextProvider;
