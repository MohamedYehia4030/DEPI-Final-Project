const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  generateToken,
} = require("../controllers/authController");
const passport = require("passport"); 

// Google OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `http://localhost:5173/auth/callback?error=true`,
    session: false,
  }),
  (req, res) => {
    // Generate JWT to send back to client
    const token = generateToken(req.user._id);
    const avatar = req.user.avatar ? encodeURIComponent(req.user.avatar) : '';

    res.redirect(
      `http://localhost:5173/auth/callback?token=${token}&name=${req.user.name}&email=${req.user.email}&avatar=${avatar}`
    );
  }
);

// Define the routes for registration and login
// These endpoints will be accessed at /api/auth/register and /api/auth/login
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);

module.exports = router;
