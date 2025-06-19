import React, { useState, useContext, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { MyContext } from '../../context/MyContext';
import axios from 'axios';

const TestimonialsPopup = ({ onClose,handleStatusChange }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { selectedTestimonialId } = useContext(MyContext);

    const [singleTestimonial, setSingleTestimonial] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}admin/testimonial/${selectedTestimonialId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setSingleTestimonial(response?.data?.data);
            } catch (error) {
                console.error("Error fetching testimonial details:", error);
            }
        };

        if (selectedTestimonialId) {
            fetchDetails();
        }
    }, [selectedTestimonialId]);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                >
                    <RxCross2 />
                </button>

                <h2 className="text-xl font-bold mb-4">Testimonial Details</h2>

                {singleTestimonial ? (
                    <>
                        <p><strong>Mobile Number:</strong> {singleTestimonial?.userId?.mobileNumber || "N/A"}</p>
                        {/* <p><strong>Email:</strong> {singleTestimonial?.userId?.email || "N/A"}</p> */}
                        <p><strong>Description:</strong> {singleTestimonial?.message || "No message"}</p>

                        <div className="mt-4 flex justify-between">
                            <button
                                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                onClick={() => handleStatusChange(selectedTestimonialId, "Approved")}
                            >
                                Approve
                            </button>
                            {/* <button
                                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                onClick={() => handleStatusChange(singleTestimonial._id, "Rejected")}
                            >
                                Reject
                            </button> */}
                        </div>
                    </>
                ) : (
                    <p>Loading testimonial details...</p>
                )}
            </div>
        </div>
    );
};

export default TestimonialsPopup;
