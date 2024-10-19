const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const OTP_EXPIRATION_TIME = 10 * 60 * 1000; // OTP expires in 10 minutes

// Register user and send OTP via email
const registerUser = async (req, res) => {
  const { name, email, password, phone, company, employeeSize } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999); // Generate 6-digit OTP
    const otpExpires = Date.now() + OTP_EXPIRATION_TIME;

    // Create a new user object
    user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      company,
      employeeSize,
      otp,
      otpExpires
    });

    // Save user to the database
    await user.save();

    // Send OTP to user's email
    const message = `Your verification code is ${otp}. This code is valid for 10 minutes.`;
    await sendEmail({
      email: user.email,
      subject: 'OTP Verification',
      message
    });

    res.status(200).json({ message: 'User registered successfully. Please verify your email.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the OTP is valid and not expired
    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Clear OTP after verification
    user.otp = null;
    user.otpExpires = null;
    user.isVerified = true;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'OTP verified successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        employeeSize: user.employeeSize
      }
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, verifyOTP };
