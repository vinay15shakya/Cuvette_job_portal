import React, { useState } from 'react';
import axios from 'axios'; // Import the Axios instance

const CreateInterviewPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCreateInterview = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken'); // Get JWT from localStorage

    try {
      await axios.post(
        '/api/jobs/create',
        { jobTitle, jobDescription, experienceLevel, candidateEmail, endDate },
        {
          headers: { Authorization: `Bearer ${authToken}` }, // Pass JWT for authentication
        }
      );
      alert('Interview created successfully!');
    } catch (error) {
      console.error('Error creating interview', error);
      alert('Failed to create interview');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl mb-6">Create Interview</h2>
        <form onSubmit={handleCreateInterview}>
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <textarea
            placeholder="Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select Experience Level</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
          <input
            type="email"
            placeholder="Candidate Email"
            value={candidateEmail}
            onChange={(e) => setCandidateEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded">
            Create Interview
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInterviewPage;
