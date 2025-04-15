import React, { useState } from "react";
import { FaEdit, FaCalendarAlt, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";

const UserData = [
    { id: 1, name: "sohan", city: "noida", pincode: "211019", mobile: "9365653452", emailid: "sohan@gmail.com" },
    { id: 2, name: "mohan", city: "delhi", pincode: "242193", mobile: "9365313400", emailid: "mohan@gmail.com" },
    { id: 3, name: "ram", city: "mumbai", pincode: "093442", mobile: "897636522", emailid: "ram@gmail.com" },
];

const User = () => {
     const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(3);
       
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
    
        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);


    const quickFilters = ["Today", "Yesterday", "This Week", "7 week", "Last Week", "This Month", "Next Year", "Custom"];

    return (
        <>
            <div className="p-6 h-screen">
            <div className="flex gap-6 items-center mb-3">
                <h1 className="text-xl font-semibold flex items-center bg-[#ce621a] text-white px-2 py-2 rounded-lg cursor-pointer " onClick={() => setIsFilterOpen(!isFilterOpen)} >
                    <FaFilter className="w-4 h-4 " />
                </h1>
                {isFilterOpen && (
                <div className=" ">
                    <div className="flex gap-5">
                        {quickFilters.map((filter) => (
                            <button key={filter} onClick={() => setIsFilterOpen(false)}
                                className=" font-semibold bg-gray-200 p-2 rounded-lg text-sm hover:bg-gray-300 cursor-pointer">
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            </div>
            <div className="shadow-md rounded-xl overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-300">
                        <tr className="border border-gray-300 ">
                            <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Sr No</th>
                            <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">City</th>
                            <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Pincode</th>
                            <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Mobile</th>
                            <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Email Id</th>
                            <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider ">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {UserData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                            <tr key={user.id} className="py-2 border border-gray-300 px-6 text-sm text-center">
                                <td className="py-2 border border-gray-300 px-2 text-sm text-center">{index + 1}</td>
                                <td className="py-2 border border-gray-300 px-2 text-sm text-center">{user.name}</td>
                                <td className="py-2 border border-gray-300 px-2 text-sm text-center">{user.city}</td>
                                <td className="py-2 border border-gray-300 px-2 text-sm text-center">{user.pincode}</td>
                                <td className="py-2 border border-gray-300 px-2 text-sm text-center">{user.mobile}</td>
                                <td className="py-2 border border-gray-300 px-2 text-sm text-center">{user.emailid}</td>
                                <td className="py-2 border border-gray-300 px-6 text-sm text-center">
                                    <div className="flex justify-center space-x-4">
                                    <button className="hover:text-blue-700 cursor-pointer">
                                        <FaEdit />
                                    </button>

                                    <button className="hover:text-blue-700 cursor-pointer">
                                        <FaCalendarAlt />
                                    </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>

            {/* <paigenstion */}
            <div className="fixed bottom-0 w-full bg-gray-200 shadow-md  flex justify-center">
                <TablePagination
                    component="div"
                    count={UserData.length}
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

export default User;