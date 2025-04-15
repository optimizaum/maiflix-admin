import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddServices = ({ closeModal }) => {
    const [description, setDescription] = useState("");
    const [formData, setFormData] = useState({
        serviceName: "",
        description: "",
        image: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, image: e.target.files[0] });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        closeModal();
    };
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
        "header", "font", "size", "bold", "italic", "underline", "strike", "color", "background", "script", "list", "indent", "align", "link", "image", "video", "blockquote", "code-block",
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

                <h2 className="text-xl font-bold mb-4">Add New Service</h2>


                <form className="space-y-4">


                    <div>
                        <label className="block text-md font-semibold">Service Name</label>
                        <input
                            type="text"
                            name="serviceName"
                            //   value=""
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter service name"
                        />
                    </div>


                    <div className="w-full  h-[250px]  shadow-sm">
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
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
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            onSubmit={handleSubmit}
                            className="px-6 py-2 bg-[#ce621a] text-white rounded-lg cursor-pointer text-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddServices;
