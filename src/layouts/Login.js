// Login.js

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users/get_user",
        loginData
      );
      if (response) {
        
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Uzair Community Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
              <input
                className="border rounded w-full py-2 px-3 mt-1"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
              <input
                className="border rounded w-full py-2 px-3 mt-1"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
            </label>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 block"
            type="submit"
          >
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
