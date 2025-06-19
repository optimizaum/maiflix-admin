// Membership.jsx
import React, { useContext, useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import TablePagination from "@mui/material/TablePagination";
import { MyContext } from '../../context/MyContext';
import MembershipDetails from './MembershipDetails';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Membership = () => {
    const { setSelectedMemberId, selectedMemberId } = useContext(MyContext);
    const { membership, fetchMembership } = useContext(MyContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [localMembership, setLocalMembership] = useState([]);

    useEffect(() => {
        fetchMembership();
    }, []);

    useEffect(() => {
        setLocalMembership(membership);
    }, [membership]);

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewDetails = (id) => {
        setSelectedMemberId(id);
        setIsPopUpOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopUpOpen(false);
        setSelectedMemberId(null);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token=localStorage.getItem('token')
            const response = await axios.put(
                `${API_BASE_URL}admin/form/${id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Status updated:", response.data);
            fetchMembership()
            setSelectedMemberId(null);
            setIsPopUpOpen(false)
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };  


    return (
        <>
            <div className="h-screen p-6">
                <h1 className="text-xl font-bold mb-4">Membership Details</h1>
                <div className="shadow-md rounded-xl overflow-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-300">
                            <tr className="border border-gray-300">
                                {[
                                    "Sr.No", "Name", "Contact Number", "Email ID", "Address",
                                    "MemberShip Plan", "MemberShip Price", "Status", "Action"
                                ].map((header, i) => (
                                    <th key={i} className="py-2 px-2 text-center text-sm border border-gray-300 font-bold text-gray-600 tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {localMembership && localMembership.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((memberShip, index) => (
                                <tr key={memberShip._id} className="border border-gray-300 text-sm text-center">
                                    <td className="py-2 border border-gray-300 px-2">{page * rowsPerPage + index + 1}</td>
                                    <td className="py-2 border border-gray-300 px-2">{memberShip.name}</td>
                                    <td className="py-2 border border-gray-300 px-2">{memberShip.mobileNumber}</td>
                                    <td className="py-2 border border-gray-300 px-2">{memberShip.email}</td>
                                    <td className="py-2 border border-gray-300 px-2">{memberShip.address?.addressLine1 || "N/A"}</td>
                                    <td className="py-2 border border-gray-300 px-2">{memberShip.membershipPlan}</td>
                                    <td className="py-2 border border-gray-300 px-2">{memberShip.memberShipPrice}</td>
                                    <td className="py-2 border border-gray-300 px-2 font-medium">
                                        {memberShip.approval === "Approved" && <span className="text-green-600">{memberShip.approval}</span>}
                                        {memberShip.approval === "Rejected" && <span className="text-red-600">{memberShip.approval}</span>}
                                        {memberShip.approval === "Pending" && <span className="text-yellow-600">{memberShip.approval}</span>}
                                    </td>
                                    <td className="py-2 border border-gray-300 px-2">
                                        <button
                                            onClick={() => handleViewDetails(memberShip._id)}
                                            className="hover:text-blue-600 cursor-pointer"
                                            title="View Details"
                                        >
                                            <FaEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="fixed bottom-0 w-full bg-gray-200 shadow-md flex justify-center">
                <TablePagination
                    component="div"
                    count={localMembership.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>

            {isPopUpOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-xl max-h-[95vh] overflow-y-auto relative p-6 shadow-lg">
                        <div className="flex flex-wrap">
                            <h2 className="text-lg font-bold mb-4">Membership Details</h2>
                            <button
                                onClick={handleClosePopup}
                                className="absolute top-3 right-3 text-gray-600 hover:text-red-500 z-10"
                            >
                                <RxCross2 size={24} />
                            </button>
                        </div>
                        <MembershipDetails handleStatusChange={handleStatusChange} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Membership;
