import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import the Axios instance

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('authToken', data.token); // Store JWT in localStorage
      navigate('/create-interview'); // Navigate to interview creation page on successful login
    } catch (error) {
      console.error('Login error', error);
      alert('Login failed, please check your credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Cuvette Assignment</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Log in
        </button>
      </form>
      <Link to="/signup">
        <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
          Create Account
        </button>
      </Link>
    </div>
  );
};

export default LoginPage;
