import React from 'react';
import { Link } from 'react-router-dom';

const OTPVerificationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl mb-6">Sign Up</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email OTP"
            className="w-full p-2 border rounded"
          />
          <button className="bg-blue-500 text-white px-4 py-2 w-full mt-2 rounded">
            Verify
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Mobile OTP"
            className="w-full p-2 border rounded"
          />
          <button className="bg-blue-500 text-white px-4 py-2 w-full mt-2 rounded">
            Verify
          </button>
        </div>
        <Link to="/create-interview">
          <button className="bg-blue-500 text-white px-4 py-2 w-full rounded">
            Continue to Interview
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
