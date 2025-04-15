import React, { useState } from 'react';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {
  const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/"); 
        onLogin(); 
    };

  
  return (
    <div className="flex items-center justify-center h-[500px] ">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        
        <div className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Enter Your Email" 
            className="w-full p-2  outline-none border-b-1 border-orange-500" 
          />
          
            <input 
              placeholder="Enter Your Password" 
              className="w-full p-2 outline-none border-b-1 border-orange-500"
            />

            <span className='flex justify-end'>
              Forgot Password?
            </span>
          
          <button onClick={handleSubmit} className="cursor-pointer w-full space-y-5 bg-[#ce621a] text-white py-3 rounded-full ">
            Login
          </button>
        </div>
      </div>
    </div>

  );
};

export default Login;