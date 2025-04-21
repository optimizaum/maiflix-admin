import React, { useState } from 'react';
import { FaEye, FaDownload } from "react-icons/fa";
import TablePagination from "@mui/material/TablePagination";

const Data = [
    {
        id: 1,
        name: "Akansha",
        Services: "Create modern",
        date: "Dec 16, 2024",
    },
    {
        id: 2,
        name: "Mohan",
        Services: "Professional designs ",
        date: "Dec 16, 2025",
    },
];

const Transaction = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const records = Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // const [isFilterOpen, setIsFilterOpen] = useState(false);
    // const quickFilters = ["Today", "Yesterday", "This Week", "7 week", "Last Week", "This Month", "Next Year", "Custom"];
    return (
        <div className="container mx-auto p-4 ">
            <div className="">
                <div className='flex  justify-between items-center p-4'>
                    <h1 className="text-xl font-bold">Transactions</h1>

                    {/* <div className="flex gap-5 items-center justify-between">


                        <h1 className="text-xl  font-semibold flex items-center bg-[#ce621a] text-white px-2 py-2 rounded-lg cursor-pointer " onClick={() => setIsFilterOpen(!isFilterOpen)} >
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
                    </div> */}
                </div>
              <div className="shadow-md rounded-xl overflow-hidden    ">

              <table className="w-full border-collapse ">
                    <thead className='bg-gray-300 '>
                        <tr className="border border-gray-300 ">
                            <th className="py-2 px-4 border text-gray-600  border-gray-400 font-bold">SR NO</th>
                            <th className="py-2 px-4 border text-gray-600  border-gray-400 font-bold">NAME</th>
                            <th className="py-2 px-4 border text-gray-600 border-gray-400 font-bold">SERVICES</th>
                            <th className="py-2 px-4 border text-gray-600 border-gray-400 font-bold">DATE & TIME</th>
                            <th className="py-2 px-4 border text-gray-600 border-gray-400 font-bold">VIEW</th>
                            <th className="py-2 px-4 border text-gray-600 border-gray-400 font-bold">DOWNLOAD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((transaction, index) => (
                            <tr key={transaction.id} className="border hover:bg-gray-100 text-sm">
                                <td className="py-2 px-4 border text-center">{page * rowsPerPage + index + 1}</td>
                                <td className="py-2 px-4 border text-center">{transaction.name}</td>
                                <td className="py-2 px-4 border text-center">{transaction.Services}</td>
                                <td className="py-2 px-4 text-center border">{transaction.date}</td>
                                <td className="py-2 px-4 text-center border">
                                    <button className="text-gray-700 hover:text-blue-700 cursor-pointer">
                                        <FaEye />
                                    </button>
                                </td>
                                <td className="py-2 px-4 flex space-x-3 justify-center">
                                    <button className="text-gray-700 hover:text-blue-700 cursor-pointer">
                                        <FaDownload />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            </div>

            <div className="fixed bottom-0 w-full bg-gray-200 shadow-md flex justify-center ">
                <TablePagination
                    component="div"
                    count={Data.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="flex justify-end" />
            </div>
        </div>
    );
};

export default Transaction;
