import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaArrowRight } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import TablePagination from "@mui/material/TablePagination";
import { CiStopwatch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const BookingData = [
    {
        id: 1,
        name: "Amit",
        services: "IT Department",
        date: "Sep 16, 2024",
        slot: ["10:59", "11:59"],
        duration: "01 hrs",
        Days: 11,
        Price: 1000,
        Status: "Active"
    },
    {
        id: 2,
        name: "Manish",
        services: "Policy",
        date: "Dec 16, 2024",
        slot: ["02:00", "03:00"],
        duration: "01 hrs",
        Days: 12,
        Price: 2000,
        Status: "Inactive"
    },
];

const Booking = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const navigate = useNavigate();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleBooking=() => {
        navigate("/booking-details")
    }
    return (
        <>
            <div className="h-screen p-6">
                <div className=" flex flex-wrap">
                    <h1 className="text-xl font-bold mb-4">Booking Details</h1>
                </div>
                <div className=' shadow-md rounded-xl overflow-hidden'>
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-300">
                            <tr className="border border-gray-300">
                                <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Sr.No</th>
                                <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Services</th>
                                <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Booking Date</th>
                                <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Slot Time</th>
                                <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Days</th>
                                <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Price</th>
                                <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BookingData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((booking, index) => (
                                <tr key={booking.id} className="py-2 border border-gray-300 px-6 text-sm text-center">
                                    <td className="py-2 border border-gray-300 px-2 text-sm text-center">{index + 1}</td>
                                    <td className="py-2 border border-gray-300 px-2 text-sm text-center">{booking.name}</td>
                                    <td className="py-2 border border-gray-300 px-2 text-sm text-center">{booking.services}</td>
                                    <td className="py-2 border border-gray-300 px-2 text-sm text-center">{booking.date}</td>
                                    <td className="py-2 border border-gray-300 px-2 text-sm text-center">
                                        <table className="py-2  px-6 text-sm text-center">
                                            <tr className="flex text-center justify-center gap-3 text-sm">
                                                <td className="flex items-center   gap-1"><CiStopwatch />{booking.slot[0]}</td>
                                                <td className="flex items-center gap-1"> - <CiStopwatch /> {booking.slot[1]}</td>
                                                <td className="flex items-center gap-1">, {booking.duration}</td>
                                            </tr>    
                                        </table>
                                    </td>
                                    <td className="py-2 border border-gray-300 px-6 text-sm text-center">{booking.Days}</td>
                                    <td className="py-2 border border-gray-300 px-6 text-sm text-center">{booking.Price}</td>
                                    <td className="py-2 border border-gray-300 px-6 text-sm text-center">{booking.Status}</td>
                                    <td className="py-2 border border-gray-300 px-6 text-sm text-center">
                                        <div className="flex justify-center space-x-4">
                                            <button className=" hover:text-blue-700 cursor-pointer">
                                                <FaEye />
                                            </button>
                                            <button className=" hover:text-blue-700 cursor-pointer">
                                                <MdAssignmentAdd />
                                            </button>
                                            <button 
                                            onClick={handleBooking}
                                            className=" hover:text-blue-700 cursor-pointer">
                                                <FaArrowRight />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="fixed bottom-0 w-full bg-gray-200 shadow-md  flex justify-center">
                <TablePagination
                    component="div"
                    count={BookingData.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="flex justify-end"
                />
            </div>
        </>
    );
};

export default Booking;
