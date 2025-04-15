import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddSlot from "./AddSlot";
import TablePagination from "@mui/material/TablePagination";

const slotsData = [
  {
    id: 1,
    days: "2",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    hours: 2,
    price: "50",
  },
  {
    id: 2,
    days: "4",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    hours: 2,
    price: "60",
  },


];

const Slot = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleEdit = (id) => {
    navigate(`/slot/edit/${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting slot with ID: ${id}`);
    // Implement delete logic here
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="p-6 h-screen">
        <div className="flex mb-5">
          <h1 className="text-2xl font-bold text-black">Slot Details</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#ce621a] text-white ml-auto px-4 py-2 rounded-lg font-semibold cursor-pointer"
          >
            + Add Slot
          </button>
        </div>

        <div className="shadow-md rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-300">
              <tr className="border border-gray-300">
                <th className="py-4 px-2 text-center border border-gray-400 text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Sr No
                </th>
                <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  Days
                </th>
                <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  End Time
                </th>
                <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  Hours
                </th>
                <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {slotsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((slot, index) => (
                <tr key={slot.id} className="">
                  <td className="py-2 border border-gray-300 px-6 text-sm text-center">
                    {page * rowsPerPage + index + 1}
                  </td>
                  <td className="py-2 border border-gray-300 px-6 text-sm text-center ">{slot.days}</td>
                  <td className="py-2 border border-gray-300 px-6 text-sm text-center ">{slot.startTime}</td>
                  <td className="py-2 border border-gray-300 px-6 text-sm text-center ">{slot.endTime}</td>
                  <td className="py-2 border border-gray-300 px-6 text-sm text-center ">{slot.hours} hrs</td>
                  <td className="py-2 border border-gray-300 px-6 text-sm text-center  ">{slot.price}</td>
                  <td className="py-2 px-6 text-center border border-gray-300">
                    <div className="flex justify-center space-x-4 ">
                      <button className="text-black hover:text-blue-700 cursor-pointer" title="View">
                        <FaEye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(slot.id)}
                        className="text-black hover:text-yellow-700 cursor-pointer"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(slot.id)}
                        className="text-black hover:text-red-700 cursor-pointer"
                        title="Delete"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>

      <div className="fixed bottom-0 w-full bg-gray-200 shadow-md  flex justify-center text-center ">
        <TablePagination
          component="div"
          count={slotsData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="flex justify-end"
        />
      </div>
      {isModalOpen && <AddSlot closeModal={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Slot;
