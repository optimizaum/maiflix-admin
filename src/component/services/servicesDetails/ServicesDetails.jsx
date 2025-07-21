import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../../context/MyContext";

function ServicesDetails() {
  const location = useLocation();
  const { API_BASE_URL } = useContext(MyContext);
  const [data, setData] = useState(null);
  const id = location?.state?.id;

  useEffect(() => {
    if (id) {
      fetchServiceDetails();
    }
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}admin/services/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(res.data?.service);
    } catch (error) {
      console.log("Error while fetching service details:", error);
    }
  };

  if (!data) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Loading Service Details...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
        Service Booking Details
      </h2>

      <div className="flex justify-between py-1 border-b text-gray-700">
        <span className="font-medium">Category:</span>
        <span>{data.category || "N/A"}</span>
      </div>
      <div className="flex justify-between py-1 border-b text-gray-700">
        <span className="font-medium">Service Type:</span>
        <span>{data.serviceType || "N/A"}</span>
      </div>
      <div className="flex justify-between py-1 border-b text-gray-700">
        <span className="font-medium">Duration:</span>
        <span>{data.serviceDuration ? `${data.serviceDuration} month` : "N/A"}</span>
      </div>
      <div className="flex justify-between py-1 border-b text-gray-700">
        <span className="font-medium">Service Variant:</span>
        <span>{data.serviceVarient || "N/A"}</span>
      </div>
      <div className="flex justify-between py-1 border-b text-gray-700">
        <span className="font-medium">Time Slot:</span>
        <span>{data.timeSlot || "N/A"}</span>
      </div>
      <div className="flex justify-between py-1 border-b text-gray-700">
        <span className="font-medium">Total Price:</span>
        <span>{data.totalPrice ? `₹ ${data.totalPrice}` : "N/A"}</span>
      </div>
      <div className="flex justify-between py-1 border-b text-gray-700">
        <span className="font-medium">UTR Number:</span>
        <span>{data.utr || "N/A"}</span>
      </div>
      <div className="flex justify-between py-1 border-b text-gray-700">
        <span className="font-medium">Customer Name:</span>
        <span>{data.userId?.name || "N/A"}</span>
      </div>
      <div className="flex justify-between py-1 border-b text-gray-700">
        <span className="font-medium">Customer Mobile:</span>
        <span>{data.userId?.mobileNumber || "N/A"}</span>
      </div>
      <div className="flex justify-between py-1 border-b text-gray-700">
        <span className="font-medium">Booking Date:</span>
        <span>
          {data.createdAt
            ? new Date(data.createdAt).toLocaleString()
            : "N/A"}
        </span>
      </div>

      {data.paymentScreenShot && (
        <div className="mt-4">
          <p className="font-semibold text-gray-700 mb-2">Payment Screenshot</p>
          <img
            src={`${API_BASE_URL}image/${data.paymentScreenShot}`}
            alt="Payment Screenshot"
            className="border rounded shadow"
          />
        </div>
      )}
    </div>
  );
}

export default ServicesDetails;
