const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const passport = require("passport");
const session = require("express-session");
const configurePassport = require("./config/Passport");

configurePassport();

connectDB();

const app = express();

app.use(cors());

// Increase body size limit for base64 image uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/auth', authRoutes);

app.use(
  session({
secret: process.env.JWT_SECRET,
resave: false,
saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
  console.log(
    "---------------------------------------------------------------------------------------"
  );
});
