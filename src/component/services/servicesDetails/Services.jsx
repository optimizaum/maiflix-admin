import React, { useContext, useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../context/MyContext";
import axios from "axios";
import AddServices from "./AddServices";
import UpdateServices from "./UpdateServices";

const Services = () => {
  const {
    API_BASE_URL,
    services,
    selectedServices,
    setSelectedServices,
    getAllServices,
  } = useContext(MyContext);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllServices();
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      axios
        .delete(`${API_BASE_URL}/service/delete/service/${id}`, {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        })
        .then(() => {
          alert("Deleted Successfully!!!");
          getAllServices();
        })
        .catch(() => {
          alert("Error while deleting!!!");
        });
    }
  };

  const handleUpdate = (id) => {
    setSelectedServices(id);
    setIsModalOpen(true);
  };

  const handlePackage = (id) => {
    setSelectedServices(id);
    localStorage.setItem("serviceId", id);
    navigate(`/packages`);
  };

  return (
    <>
      <div className="p-6">
        <div className="flex mb-5">
          <h1 className="text-xl font-bold">Services Details</h1>
        </div>

        <div className="shadow-md rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-300">
              <tr className="border border-gray-300">
                <th className="py-4 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  Sr. No
                </th>
                <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  User Name
                </th>
                <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  Mobile Number
                </th>
                <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="py-2 px-2 text-center text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {services &&
                services.map((service, index) => (
                  <tr key={service._id}>
                    <td className="py-2 border border-gray-300 px-6 text-sm text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 border border-gray-300 px-6 text-sm text-center">
                      {service?.category || "N/A"}
                    </td>
                    <td className="py-2 border border-gray-300 px-6 text-sm text-center">
                      {service?.userId?.name || "N/A"}
                    </td>
                    <td className="py-2 border border-gray-300 px-6 text-sm text-center">
                      {service?.userId?.mobileNumber || "N/A"}
                    </td>
                    <td className="py-2 border border-gray-300 px-6 text-sm text-center">
                      {service?.totalPrice || "N/A"}
                    </td>
                    <td className="py-2 px-6 border border-gray-300">
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={() =>
                            navigate("/details", {
                              state: { id: service?._id },
                            })
                          }
                          className="text-gray-700 hover:text-black cursor-pointer"
                        >
                          <IoEyeSharp />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && <AddServices closeModal={() => setIsModalOpen(false)} />}
      {isModalOpen && selectedServices && (
        <UpdateServices
          serviceData={selectedServices}
          closeModal={() => {
            setIsModalOpen(false);
            setSelectedServices(null);
          }}
        />
      )}
    </>
  );
};

export default Services;
