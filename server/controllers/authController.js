const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function to generate a JWT (JSON Web Token)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({
        message: "Please include all fields: name, email, and password.",
      });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// @desc    Authenticate a user (Login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Initial validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please include both email and password." });
  }

  try {
    // 1. Find user by email
    // NOTE: 'user' is declared and initialized successfully within the try block.
    const user = await User.findOne({ email });

    // 2. Check if the user exists AND if the password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // 3. Success: Send back user data and a new token
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // 4. Failure: User not found or password incorrect
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login." });
  }
};

// @desc    Get user data (The user who is logged in)
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  // The 'protect' middleware ensures req.user is populated with the authenticated user's data
  res.status(200).json(req.user);
};

// Export the functions
module.exports = {
  registerUser,
  loginUser,
  getMe,
  generateToken,
};
