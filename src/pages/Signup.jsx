import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Login from './Login';


const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 const Navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    Navigate('/Login');
   
  };

  return (
    <div className="flex w-full justify-center h-screen">
      <div className="sm:flex sm:w-full sm:bg-[#DB2777] sm:rounded-r-[110px]">
        {/* Optional background content */}
      </div>
      <div className="flex w-full h-screen justify-center items-center">
        <div className="w-[62%] m-13">
          <h1 className="text-center text-2xl font-bold">Sign up!!</h1>
          <p className="text-center mt-3 mb-3">Create your account</p>
          <form id="Register" onSubmit={handleSubmit} className="f">
            <div className="space-y-2">
              <label className="m-13" htmlFor="firstName">First name</label>
              <input
                className="p-5 h-12 w-full border-[1px] bg-[#F8FAFC] border-[#94A3B8] rounded-md"
                placeholder="First Name"
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="m-13" htmlFor="lastName">Last name</label>
              <input
                className="p-5 h-12 w-full border-[1px] bg-[#F8FAFC] border-[#94A3B8] rounded-md"
                placeholder="Last Name"
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="m-13" htmlFor="email">Email</label>
              <input
                className="p-5 h-12 w-full border-[1px] bg-[#F8FAFC] border-[#94A3B8] rounded-md"
                placeholder="Email"
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="m-13" htmlFor="password">Password</label>
              <input
                className="p-5 h-12 w-full border-[1px] bg-[#F8FAFC] border-[#94A3B8] rounded-md"
                placeholder="Password"
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="m-13" htmlFor="confirm-password">Confirm Password</label>
              <input
                className="p-5 h-12 w-full border-[1px] bg-[#F8FAFC] border-[#94A3B8] rounded-md"
                id="confirm-password"
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center w-full py-4">
              <button className="bg-[#DB2777] w-4/12 text-4 h-12 rounded-md text-white" id="submit">
                Submit
              </button>
            </div>
          </form>
          <div className="w-[74%] sm:w-full mt-2 flex justify-center">
            Already have an account?<Link to="/Login" className="underline text-[#DB2777]">login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
