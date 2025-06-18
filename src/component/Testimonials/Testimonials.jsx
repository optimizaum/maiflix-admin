import React, { useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import TablePagination from "@mui/material/TablePagination";
import TestimonialsPopup from './TestimonialsPopup';

const Testimonials = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);

    const testimonialData = [
        { id: 1, name: 'Akash', description: 'It is my testimonial 1' },
        { id: 2, name: 'Riya', description: 'It is my testimonial 2' },
        { id: 3, name: 'Aman', description: 'It is my testimonial 3' },
        { id: 4, name: 'Neha', description: 'It is my testimonial 4' },
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = (id) => {
        alert(`Deleted testimonial with id: ${id}`);
    };

    const handleViewDetails = (testimonial) => {
        setSelectedTestimonial(testimonial);
        setPopupOpen(true);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Testimonials</h1>
            </div>

            <div className="shadow-md rounded-xl overflow-x-auto bg-white">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 border border-gray-300">SR No</th>
                            <th className="py-3 px-4 border border-gray-300">Name</th>
                            <th className="py-3 px-4 border border-gray-300">Description</th>
                            <th className="py-3 px-4 border border-gray-300 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonialData.length > 0 ? (
                            testimonialData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((testimonial, index) => (
                                    <tr key={testimonial.id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border border-gray-300 text-center">
                                            {page * rowsPerPage + index + 1}
                                        </td>
                                        <td className="py-2 px-4 border border-gray-300 text-center">
                                            {testimonial.name}
                                        </td>
                                        <td className="py-2 px-4 border border-gray-300 text-center">
                                            {testimonial.description}
                                        </td>
                                        <td className="py-2 px-4 border border-gray-300 text-center">
                                            <div className="flex justify-center gap-4 text-lg text-gray-700">
                                                <button
                                                    onClick={() => handleViewDetails(testimonial)}
                                                    className="hover:text-blue-600 cursor-pointer"
                                                    title="View Details"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    className="hover:text-red-600"
                                                    title="Delete"
                                                    onClick={() => handleDelete(testimonial.id)}
                                                >
                                                    <FaTrash className='cursor-pointer' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No Testimonials Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="fixed bottom-0 w-full bg-gray-200 shadow-md flex justify-center">
                <TablePagination
                    component="div"
                    count={testimonialData.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>

            {popupOpen && (
                <TestimonialsPopup
                    isOpen={popupOpen}
                    onClose={() => setPopupOpen(false)}
                    data={selectedTestimonial}
                />
            )}
        </div>
    );
};

export default Testimonials;
