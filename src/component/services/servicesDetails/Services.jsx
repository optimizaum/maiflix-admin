import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddServices from "./AddServices";
import TablePagination from "@mui/material/TablePagination";
const servicesData = [
  {
    id: 1,
    name: "Web Development",
    description: "Create modern and responsive websites.",
    image: "",
    packages: 3,
  },
  {
    id: 2,
    name: "Graphic Design",
    description: "Professional designs for branding & marketing.",
    image: "",
    packages: 2,
  },
];

const Services = () => {
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

  const handlePackage = () => {
    navigate("/packages");
  };

  return (
    <>
    <div className=" p-6 h-screen">
      <div className=" flex mb-5">
        <h1 className="text-xl font-bold">Services Details</h1>
        <button
          onClick={() => setIsModalOpen(true)}

          className="ml-auto bg-[#ce621a] px-3 py-2 rounded-lg text-white font-semibold cursor-pointer">
          Add Services
        </button>
        </div>

        <div className=" shadow-md rounded-xl overflow-hidden">
       
       <table className="w-full border-collapse">
          <thead className="bg-gray-300">
            <tr className="border border-gray-300 ">
              <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Sr. No</th>
              <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Service Name</th>
              <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Description</th>
              <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Image</th>
              <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">No. of Packages</th>
              <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {servicesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((service, index) => (
              <tr key={service.id} className="">
                <td className="py-2 border border-gray-300 px-6 text-sm text-center">{index + 1}</td>
                <td className="py-2 border border-gray-300 px-6 text-sm text-center">{service.name}</td>
                <td className="py-2 border border-gray-300 px-6 text-sm text-center">{service.description}</td>
                <td className="py-2 border border-gray-300 px-6 text-sm text-center">
                  <img src={service.image} alt="Service" className="w-10 h-10 rounded-md" />
                </td>
                <td className="py-2 border border-gray-300 px-6 text-sm text-center">{service.packages}</td>
                <td className="py-2 px-6 border border-gray-300 ">
                  <div className="flex justify-center space-x-4">
                  <button className="text-gray-700 hover:text-blue-700 cursor-pointer">
                    <FaEye />
                  </button>
                  <button className="text-gray-700 hover:text-yellow-700 cursor-pointer">
                    <FaEdit />
                  </button>
                  <button className="text-gray-700 hover:text-red-700 cursor-pointer">
                    <FaTrash />
                  </button>
                  <button onClick={handlePackage} className="text-gray-700 hover:text-black cursor-pointer">
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
            count={servicesData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="flex justify-end"
          />
        </div>
         {/* --------------- */}
      {isModalOpen && (
        <AddServices closeModal={() => setIsModalOpen(false)} />)}
    </>
  );
};

export default Services;
