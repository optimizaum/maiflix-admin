import React, { useState, useRef } from 'react'
import { RxCross2 } from "react-icons/rx";
import DatePicker from "react-datepicker";
import { FaRegClock } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const AddSlot = ({ closeModal }) => {
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectTime,setSelecteTime]=useState(null);
    const datePickerRef = useRef(null);
    const timepicker =useRef(null);
    const [formData, setFormData] = useState({
        time: "",
        day: "",
        price: "",
    });

    const handleChange = (e) => {
        const { time, value } = e.target;
        setFormData({ ...formData, [time]: value, day: value, price: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        closeModal();
    };

    return (
        <>
            <div className="fixed inset-0 bg-[#000000b8] bg-opacity-30 backdrop-blur-sm flex justify-center items-center">

                <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">

                    <button
                        type="button"
                        onClick={closeModal}
                        className="absolute top-4 right-5 px-2 py-2 bg-[#ce621a] rounded-xl text-lg cursor-pointer"
                    >
                        <RxCross2 className="font-bold text-white " />
                    </button>

                    <h2 className="text-xl font-bold mb-4">Add New Slots</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-md font-semibold"> Time</label>
                            <div className='flex flex-wrap gap-5'>

                                <div className='flex-1'>

                                    <label className="block text-md font-semibold">Start Time</label>
                                    <div className="relative">
                                        <DatePicker
                                            selected={selectedTime}
                                            ref={datePickerRef}
                                            onChange={(time) => setSelectedTime(time)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            className="w-full p-2 border rounded-md pl-10" // Add padding for icon
                                        />
                                        {/* Watch Icon */}
                                        <FaRegClock onClick={() => datePickerRef.current.setOpen(true)} className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-900 text-lg" />
                                    </div>
                                </div>
                                <div className='flex-1'>

                                    <label className="block text-md font-semibold">End Time</label>
                                    <div className="relative">
                                        <DatePicker
                                            selected={selectTime}
                                            ref={timepicker}
                                            onChange={(time) => setSelecteTime(time)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            className="w-full p-2 border rounded-md pl-10" 
                                        />
                                        {/* Watch Icon */}
                                        <FaRegClock onClick={() => timepicker.current.setOpen(true)} className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-900 text-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div>
                            <label className="block text-md font-semibold">Day</label>
                            <input
                                type="number"
                                //   value=""
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-md [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                placeholder=""
                            />
                        </div>

                        <div>
                            <label className="block text-md font-semibold">Price</label>
                            <input
                                type="number"
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
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
        </>
    )
}

export default AddSlot