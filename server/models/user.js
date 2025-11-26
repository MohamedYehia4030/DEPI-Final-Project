const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Password is required if no Google ID
      },
    },
    googleId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// This line is crucial: it exports the Model directly.
// If you wrapped it in an object (e.g., module.exports = { User }),
// you would get the "not a function" error when calling User.findOne()
module.exports = mongoose.model("User", userSchema);
