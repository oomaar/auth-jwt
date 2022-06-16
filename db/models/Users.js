const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password should be at least 6 characters"],
  },
});

// Fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
  console.log("new user was created & saved", doc);
  next();
});

// Fire a function before doc saved to db
// for more checkout the mongoose hooks docs
userSchema.pre("save", function (next) {
  console.log("user about to be created and saved", this);

  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
