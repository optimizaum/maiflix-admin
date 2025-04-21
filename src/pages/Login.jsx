import axios from "axios";
import React, { useContext, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";

const Login = () => {
  const { API_BASE_URL, navigate, setRole } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    axios
      .post(`${API_BASE_URL}/auth/login`, payload)
      .then((result) => {
        console.log(result);
        localStorage.setItem("token", result?.data?.token);
        setRole("admin");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center h-[500px] ">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2  outline-none border-b-1 border-orange-500"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="w-full p-2 outline-none border-b-1 border-orange-500"
            />

            <span className="flex justify-end">Forgot Password?</span>

            <button
              className="cursor-pointer w-full space-y-5 bg-[#ce621a] text-white py-3 rounded-full "
              type="submit"
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
