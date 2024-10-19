const Job = require('../models/Job');
const User = require('../models/User');

// Create a new job post
const createJob = async (req, res) => {
  const { title, description, experienceLevel, candidateEmail, endDate } = req.body;

  try {
    // Check if the user is authenticated
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Please log in to create a job post.' });
    }

    // Create the new job post
    const newJob = new Job({
      title,
      description,
      experienceLevel,
      candidateEmail,
      endDate,
      createdBy: user._id, // Associate the job post with the user who created it
    });

    // Save the job post in the database
    const savedJob = await newJob.save();

    // Optionally, you could send an email notification to the candidate about the job posting
    /*
    const message = `You have been invited to apply for the position of ${title}. Please check the company details for more info.`;
    await sendEmail({
      email: candidateEmail,
      subject: 'Job Invitation',
      message,
    });
    */

    res.status(201).json({ message: 'Job created successfully', job: savedJob });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createJob };
