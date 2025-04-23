import axios from 'axios';
import React, { useState ,useContext} from 'react';
import { RxCross2 } from 'react-icons/rx';
import { MyContext } from '../../context/MyContext';

const AddTestimonial = ({ closeModal }) => {
    const { API_BASE_URL } = useContext(MyContext);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${API_BASE_URL}/testimonial`, formData, {
            headers: { Authorization: `${localStorage.getItem("token")}` },
        })
        console.log(response.data);

        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-[#000000b8] bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-4 right-5 px-2 py-2 bg-[#ce621a] rounded-xl text-lg cursor-pointer"
                >
                    <RxCross2 className="font-bold text-white" />
                </button>

                <h2 className="text-xl font-bold mb-4">Add Testimonial</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-md font-semibold">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter testimonial name"
                        />
                    </div>

                    <div>
                        <label className="block text-md font-semibold">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter testimonial description"
                        />
                    </div>

                    <div>
                        <label className="block text-md font-semibold">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            
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

export default AddTestimonial;
