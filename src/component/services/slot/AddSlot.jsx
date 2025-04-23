import React, { useState, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import DatePicker from "react-datepicker";
import { FaRegClock } from "react-icons/fa";
import { MyContext } from "../../../context/MyContext"; 
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const AddSlot = ({ closeModal }) => {
  const [selectedTime, setSelectedTime] = useState(null);
   const { API_BASE_URL } = useContext(MyContext);
  console.log("----->", selectedTime);
  const packageId=localStorage.getItem('packageId');
  const [selectTime, setSelecteTime] = useState(null);
  const datePickerRef = useRef(null);
  const timepicker = useRef(null);
  const [formData, setFormData] = useState({
    start: "",
    end:"",
    days: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData,[name]:value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("packageId ",packageId)
     try{
         const response= await axios.post(`${API_BASE_URL}/slots/add-slots/${packageId}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
     },formData);
     console.log(response);

     }catch(err){
      console.log(err);
     }
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
          <form className="space-y-4"  onSubmit={handleSubmit}>
            <div>
              <label className="block text-md font-semibold"> Time</label>
              <div className="flex flex-wrap gap-5">
                <div className="flex-1">
                  <label className="block text-md font-semibold">
                    Start Time
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={selectedTime}
                      ref={datePickerRef}
                      onChange={(time) =>{
                       setSelectedTime(time)
                        setFormData((prevData) => ({
      ...prevData,
      start: time, // save start time to formData
    }));
                      }
                       }
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      className="w-full p-2 border rounded-md pl-10" // Add padding for icon
                    />
                    {/* Watch Icon */}
                    <FaRegClock
                      onClick={() => datePickerRef.current.setOpen(true)}
                      className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-900 text-lg"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-md font-semibold">
                    End Time
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={selectTime}
                      ref={timepicker}
                      onChange={(time) =>{
                         setSelecteTime(time)
                          setFormData((prevData) => ({
      ...prevData,
      end: time, // save start time to formData
    }));
                      }
                         }
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      className="w-full p-2 border rounded-md pl-10"
                    />
                    {/* Watch Icon */}
                    <FaRegClock
                      onClick={() => timepicker.current.setOpen(true)}
                      className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-900 text-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-md font-semibold">Day</label>
              <input
                type="number"
                //   value=""
                name="days"
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
                name="price"
                onChange={handleChange}
                className="w-full p-2 border rounded-md [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
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
    </>
  );
};

export default AddSlot;
