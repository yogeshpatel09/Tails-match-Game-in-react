import React, { useState } from 'react';

import Signup from './Signup';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const Navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user with matching email and password
    const user = storedUsers.find((user) => user.email === email && user.password === password);

    if (user) {
      // Login is successful
      console.log("Login successful");
      Navigate('/Game')
    } else {
      // If no matching user is found, show an alert
      alert("Invalid email or password, or no user data found. Please sign up first.");
    }
  };

  return (
    <div className="m-0 p-0 bg-white h-screen flex justify-center items-center">
      <div className="flex flex-wrap w-full h-full justify-center items-center">
        <div className="hidden lg:flex w-1/2 h-full bg-[#FF6C77]"></div>
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 h-full px-4 lg:px-0">
          <div className="w-full lg:w-3/5">
            <h1 className="text-center text-2xl font-semibold">Welcome Back</h1>
            <p className="text-center text-[#9B8282] my-4">Login your account</p>
            <form id="Register" onSubmit={handleSubmit}>
              <label className="block text-lg font-medium mb-2">Email </label>
              <input
                type="email"
                id="email"
                required
                placeholder="Email"
                className="bg-[#F8FAFC] w-full p-4 mb-4 border border-[#94A3B8] rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="block text-lg font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                required
                placeholder="Password"
                className="bg-[#F8FAFC] w-full p-4 mb-4 border border-[#94A3B8] rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <input required type="checkbox" className="mr-2" />
                  <label className="text-sm">Remember me</label>
                </div>
                <a href="#" className="text-[#FF6C77] text-sm">forgot password?</a>
              </div>

              <div className="flex justify-center mb-4">
                <button
                  type="submit"
                  className="bg-[#FF6C77] text-white w-full py-4 rounded-lg text-lg font-medium"
                  id="submit"
                >
                 Login
                </button>
              </div>
            </form>
            <div className="flex justify-start text-sm">
              Do you have an account?
              <Link to="/" className="text-[#FF6C77] ml-2">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
