import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import the Axios instance

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    companyName: '',
    email: '',
    password: '',
    employeeSize: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', formData); // Use Axios instance
      alert('Registration successful, please log in');
      navigate('/login');
    } catch (error) {
      console.error('Signup error', error);
      alert('Sign-up failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone no."
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Company Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="number"
            name="employeeSize"
            placeholder="Employee Size"
            value={formData.employeeSize}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 w-full rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
