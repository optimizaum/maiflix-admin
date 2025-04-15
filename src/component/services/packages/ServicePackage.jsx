import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddPackages from "./AddPackages";
import TablePagination from "@mui/material/TablePagination";

const servicesData = [
  {
    id: 1,
    name: "Web Development",
    description: "Create modern and responsive websites.",
    image: "https://via.placeholder.com/50",
    packages: 3,
  },
  {
    id: 2,
    name: "Graphic Design",
    description: "Professional designs for branding & marketing.",
    image: "https://via.placeholder.com/50",
    packages: 2,
  },
];

const ServicePackage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSlot = () => {
    navigate("/slot");
  };

  return (
    <>
      <div className=" p-6 h-screen">
        {/* Header Section */}
        <div className="flex mb-5">
          <h2 className="text-xl font-bold">Package Details</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto bg-[#ce621a] px-3 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-[#b85015] transition"
          >
            Add Packages
          </button>
        </div>

        {/* Table Section */}
        <div className="shadow-md rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-300">
              <tr className="border border-gray-300">
                <th className="py-2 px-4 border border-gray-400 text-gray-600 tracking-wider">
                  SR No
                </th>
                <th className="py-4 px-6 text-left text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  Package Name
                </th>
                <th className="py-4 px-6 text-left text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  Package Description
                </th>
                <th className="py-4 px-6 text-left text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  No. Of Slots
                </th>
                <th className="py-4 px-6 text-left text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {servicesData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((service, index) => (
                  <tr key={service.id}>
                    <td className="py-2 border border-gray-300 px-6 text-sm">
                      {page * rowsPerPage + index + 1}
                    </td>
                    <td className="py-2 border border-gray-300 px-6 text-sm">
                      {service.name}
                    </td>
                    <td className="py-2 border border-gray-300 px-6 text-sm">
                      {service.description}
                    </td>
                    <td className="py-2 border border-gray-300 px-6 text-sm font-semibold">
                      {service.packages}
                    </td>
                    <td className="py-2 px-6 border border-gray-300">
                      <div className="flex justify-center space-x-4">
                        <button
                          className="text-gray-700 hover:text-blue-700 cursor-pointer"
                          aria-label="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="text-gray-700 hover:text-yellow-700 cursor-pointer"
                          aria-label="Edit Package"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-gray-700 hover:text-red-700 cursor-pointer"
                          aria-label="Delete Package"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={handleSlot}
                          className="text-gray-700 hover:text-black cursor-pointer"
                          aria-label="View Slots"
                        >
                          <FaArrowRight />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
       

       
      </div>
      <div className="fixed bottom-0 w-full bg-gray-200 shadow-md  flex justify-center">
          <TablePagination
            component="div"
            count={servicesData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="flex justify-end"
          />
        </div>
        {isModalOpen && <AddPackages closeModal={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ServicePackage;
