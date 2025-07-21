import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../../context/MyContext";

function ServicesDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { API_BASE_URL } = useContext(MyContext);
  const [data, setData] = useState(null);
  const [membershipData, setMembershipData] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setMembershipData(res.data?.membershpiForm);
    } catch (error) {
      console.log("Error while fetching service details:", error);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${API_BASE_URL}admin/services-accept-reject`,
        { id: data._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message || "Status Updated");
      navigate("/services");
    } catch (error) {
      console.log("Error while updating status:", error);
      alert("Error updating status");
    } finally {
      setLoading(false);
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
    <div className="max-w-xl mx-auto mt-8 border rounded shadow h-[500px] overflow-y-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
        Service Booking Details
      </h2>

      <div className="space-y-2 text-gray-700">
        <DetailItem title="Category" value={data.category} />
        <DetailItem title="Service Type" value={data.serviceType} />
        <DetailItem title="Duration" value={data.serviceDuration} />
        <DetailItem title="Service Variant" value={data.serviceVarient} />
        <DetailItem title="Time Slot" value={data.timeSlot} />
        <DetailItem title="Start Time" value={data.startTime} />
        <DetailItem title="End Time" value={data.endTime} />
        <DetailItem
          title="Total Price"
          value={data.totalPrice ? `₹ ${data.totalPrice}` : "N/A"}
        />
        <DetailItem title="UTR Number" value={data.utr} />
        <DetailItem title="Approval Status" value={data.approval} />
        <DetailItem title="Booking Date" value={data.createdAt ? new Date(data.createdAt).toLocaleString() : "N/A"} />

        <hr className="my-2" />

        <h3 className="text-lg font-semibold text-gray-800">Customer Details</h3>
        <DetailItem title="Customer Name" value={membershipData?.name} />
        <DetailItem title="Customer Mobile" value={membershipData?.mobileNumber} />
        <DetailItem title="Customer Email" value={membershipData?.email} />
        <DetailItem title="Membership Plan" value={membershipData?.membershipPlan} />
        <DetailItem title="Membership Price" value={membershipData?.memberShipPrice} />
        <DetailItem title="Membership Status" value={membershipData?.approval} />
        <DetailItem title="Membership Start Date" value={membershipData?.memberShipStartDate ? new Date(membershipData?.memberShipStartDate).toLocaleDateString() : "N/A"} />
        <DetailItem title="Membership End Date" value={membershipData?.memberShipEndDate ? new Date(membershipData?.memberShipEndDate).toLocaleDateString() : "N/A"} />

        <h3 className="text-lg font-semibold text-gray-800 mt-2">Customer Address</h3>
        <DetailItem title="Address Line" value={membershipData?.address?.addressLine1} />
        <DetailItem title="City" value={membershipData?.address?.city} />
        <DetailItem title="State" value={membershipData?.address?.state} />
        <DetailItem title="Pincode" value={membershipData?.address?.pincode} />
        <DetailItem title="Country" value={membershipData?.address?.country} />

        {data.paymentScreenShot && (
          <div className="mt-4">
            <p className="font-semibold text-gray-700 mb-2">Payment Screenshot</p>
            <img
              src={`${API_BASE_URL}uploads/${data?.paymentScreenShot}`}
              alt="Payment Screenshot"
              className="border rounded shadow w-full"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => handleStatusUpdate("Approved")}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {loading ? "Processing..." : "Accept"}
        </button>
        <button
          onClick={() => handleStatusUpdate("Rejected")}
          disabled={loading}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          {loading ? "Processing..." : "Reject"}
        </button>
      </div>
    </div>
  );
}

const DetailItem = ({ title, value }) => (
  <div className="flex justify-between py-1 border-b">
    <span className="font-medium">{title}:</span>
    <span>{value || "N/A"}</span>
  </div>
);

export default ServicesDetails;
