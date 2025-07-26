// MembershipDetails.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MyContext } from '../../context/MyContext';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MembershipDetails = ({ handleStatusChange }) => {
    const { API_BASE_URL,selectedMemberId } = useContext(MyContext);
    const [singleMembership, setSingleMembership] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`${API_BASE_URL}admin/form/${selectedMemberId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setSingleMembership(response.data.form);
            } catch (error) {
                console.error("Error fetching member details:", error);
            }
        };

        if (selectedMemberId) {
            fetchDetails();
        }
    }, [selectedMemberId]);

    if (!singleMembership) return <div>Loading...</div>;

    return (
        <div className="bg-white p-6 rounded-lg">
            <ul className="text-sm space-y-4">
                <div className='flex flex-wrap'>
                    <div className='flex-1 space-y-2'>
                        <li><strong>Name:</strong> {singleMembership.name}</li>
                        <li><strong>Contact:</strong> {singleMembership.mobileNumber}</li>
                        <li><strong>Email:</strong> {singleMembership.email}</li>
                        <li><strong>Locality:</strong> {singleMembership.address?.addressLine1}</li>
                        <li><strong>City:</strong> {singleMembership.address?.city}</li>
                        <li><strong>Location:</strong> {singleMembership.address?.location}</li>
                        <li><strong>PinCode:</strong> {singleMembership.address?.pincode}</li>
                        {/* <li><strong>State:</strong> {singleMembership.address?.state}</li> */}
                        <li><strong>Plan:</strong> {singleMembership.membershipPlan}</li>
                        <li><strong>Price:</strong> ₹{singleMembership.memberShipPrice}</li>
                        <li><strong>Transaction ID:</strong> {singleMembership.utr}</li>
                        <li><strong>Status:</strong>    {singleMembership.approval}</li>

                    </div>
                    <div className='flex-1'>
                        <li className='text-center'>
                            <strong>Payment Screenshot:</strong>
                            <img
                                src={`${API_BASE_URL}uploads/${singleMembership.paymentScreenShot}`}
                                alt="Payment Screenshot"
                                className="h-auto rounded shadow-md items-center"
                            />

                        </li>
                    </div>
                </div>
            </ul>
            <div className="mt-4 flex justify-between">
                <button
                    className="px-4 py-2 font-semibold bg-green-600 cursor-pointer text-white rounded hover:bg-green-700 text-sm"
                    onClick={() => handleStatusChange(selectedMemberId, "Approved")}
                >
                    Approve
                </button>
                <button
                    className="px-4 py-2 bg-red-600 font-semibold cursor-pointer text-white rounded hover:bg-red-700 text-sm"
                    onClick={() => handleStatusChange(selectedMemberId, "Rejected")}
                >
                    Reject
                </button>

            </div>
        </div>
    );
};

export default MembershipDetails;
