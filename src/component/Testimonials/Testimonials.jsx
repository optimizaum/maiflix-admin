import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import TablePagination from "@mui/material/TablePagination";
import TestimonialsPopup from './TestimonialsPopup';
import { MyContext } from '../../context/MyContext';
import axios from 'axios';
const Testimonials = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [popupOpen, setPopupOpen] = useState(false);
    const { setSelectedTestimonialId, selectedTestimonialId } = useContext(MyContext);
    const { alltestimonials, fetchTestimonials } = useContext(MyContext)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${API_BASE_URL}admin/testimonial/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                alert("Deleted Successfully!");
                fetchTestimonials(); // Refresh list after deletion
            } else {
                alert("Failed to delete. Please try again.");
            }
        } catch (error) {
            console.error("Feedback Deleted Error", error);
            alert("An error occurred while deleting.");
        }
    };


    const handleViewDetails = (id) => {
        setSelectedTestimonialId(id);
        setPopupOpen(true);
    };

    useEffect(() => {
        fetchTestimonials();
    }, [])

    const handleClosePopup = () => {
        setPopupOpen(false);
        setSelectedTestimonialId(null);
    }

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.put(
                `${API_BASE_URL}admin/testimonial-approval/${id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Status updated:", response.data);
            fetchTestimonials();
            setSelectedTestimonialId(null);
            setPopupOpen(false);
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    // ---------delete api integration------------------

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Your Feedback</h1>
            </div>

            <div className="shadow-md rounded-xl overflow-x-auto bg-white">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 border border-gray-300">SR No</th>
                            <th className="py-3 px-4 border border-gray-300">Name</th>
                            <th className="py-3 px-4 border border-gray-300">Contact Number</th>
                            <th className="py-3 px-4 border border-gray-300">Description</th>
                            <th className="py-3 px-4 border border-gray-300">Status</th>
                            <th className="py-3 px-4 border border-gray-300 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alltestimonials && alltestimonials
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((testimonial, index) => (
                                <tr key={testimonial.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border border-gray-300 text-center">
                                        {page * rowsPerPage + index + 1}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300 text-center">
                                        {testimonial?.userId?.name}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300 text-center">
                                        {testimonial?.userId?.mobileNumber}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300 text-center">
                                        {testimonial.message &&
                                            (testimonial.message.length > 60
                                                ? testimonial.message.slice(0, 60) + "..."
                                                : testimonial.message)}
                                    </td>
                                    <td className="py-2 border border-gray-300 px-2 text-center font-medium">
                                        {(testimonial.isApproved === true || testimonial.isApproved === "Approved") && (
                                            <span className="text-green-600">Approved</span>
                                        )}
                                        {/* {(testimonial.isApproved === false || testimonial.isApproved === "Rejected") && (
                                            <span className="text-red-600">Rejected</span>
                                        )} */}
                                        {(!testimonial.isApproved || testimonial.isApproved === "Pending") &&
                                            testimonial.isApproved !== "Rejected" && testimonial.isApproved !== true && (
                                                <span className="text-yellow-600">Pending</span>
                                            )}
                                    </td>


                                    <td className="py-2 px-4 border border-gray-300 text-center">
                                        <div className="flex justify-center gap-4 text-lg text-gray-700">
                                            <button
                                                onClick={() => handleViewDetails(testimonial._id)}
                                                className="hover:text-orange-700 cursor-pointer"
                                                title="View Details"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(testimonial._id)}
                                                className="hover:text-red-600"
                                                title="Delete"
                                            >
                                                <FaTrash className="cursor-pointer" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>

            <div className="fixed bottom-0 w-full bg-gray-200 shadow-md flex justify-center">
                <TablePagination
                    component="div"
                    count={alltestimonials.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>

            {popupOpen && (
                <TestimonialsPopup
                    isOpen={popupOpen}
                    onClose={handleClosePopup}
                    // data={selectedTestimonialId}
                    handleStatusChange={handleStatusChange}
                />
            )}
        </div>
    );
};

export default Testimonials;
