import axios from "axios";
import React, { useContext, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";

const Login = () => {
  const { API_BASE_URL } = useContext(MyContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post(`${API_BASE_URL}admin/login`, {
        email,
        password,
      });

      const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/");

    } catch (err) {
      console.error("Login Error:", err);
     
    } 
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 outline-none border-b border-orange-500"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full p-2 pr-10 outline-none border-b border-orange-500"
                required
              />
              <div
                className="absolute right-2 top-2.5 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VscEyeClosed /> : <VscEye />}
              </div>
            </div>

            {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

            <span className="flex justify-end text-sm text-gray-500 hover:text-black cursor-pointer">
              Forgot Password?
            </span>

            <button
              className="w-full bg-[#ce621a] text-white py-3 rounded-full hover:bg-[#b75714] disabled:opacity-70"
              type="submit"
              // disabled={loading}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
