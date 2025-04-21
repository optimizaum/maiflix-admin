import React, { useContext, useEffect, useState } from "react";

import { RxCross2 } from "react-icons/rx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MyContext } from "../../../context/MyContext";
import axios from "axios";
import { useParams } from "react-router-dom";
const UpdateServices = ({ closeModal, serviceData }) => {
  const { API_BASE_URL, singleServices, getAllSingleServices } =
    useContext(MyContext);
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", service);
    formData.append("description", description);
    formData.append("image", image);
    axios
      .put(`${API_BASE_URL}/service/update/service/${serviceData}`, formData, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    closeModal();
  };
  useEffect(() => {
    if (serviceData) {
      getAllSingleServices(serviceData);
    }
  }, [serviceData]);
  console.log("--------------->", singleServices);

  useEffect(() => {
    if (singleServices) {
      setService(singleServices?.name);
      setDescription(singleServices?.description);
      setImage(singleServices?.image);
    }
  }, [singleServices]);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image"],
    ],
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "indent",
    "align",
    "link",
    "image",
    "video",
    "blockquote",
    "code-block",
  ];
  return (
    <div className="fixed inset-0 bg-[#000000b8] bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2xl relative">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-5 px-2 py-2 bg-[#ce621a] rounded-xl text-lg cursor-pointer"
        >
          <RxCross2 className="font-bold text-white " />
        </button>

        <h2 className="text-xl font-bold mb-4">Update New Service</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-md font-semibold">Service Name</label>
            <input
              type="text"
              name="serviceName"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter service name"
            />
          </div>

          <div className="w-full  h-[250px]  shadow-sm">
            <ReactQuill
              theme="snow"
              value={description}
              onChange={(content) => setDescription(content)}
              modules={modules}
              formats={formats}
              className=" h-[184px] bg-white "
              placeholder="Service Description..."
            />
          </div>

          <div>
            <label className="block text-md font-semibold">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="px-6 py-2 bg-[#ce621a] text-white rounded-lg cursor-pointer text-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateServices;
