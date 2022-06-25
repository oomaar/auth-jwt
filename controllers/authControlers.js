const jwt = require("jsonwebtoken");
const User = require("../db/models/Users");

const handleErrors = (error) => {
  const errors = {
    email: "",
    password: "",
  };

  // Validation errors
  if (error.message.includes("user validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // Validate Duplicate Error Code
  if (error.code === 11000) {
    errors.email = "This email is already registered";
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  // jwt.sign(payload, secret, options)
  return jwt.sign(
    { id },
    "this is the secret, this should be long and in a .env file",
    {
      expiresIn: maxAge,
    }
  );
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt call it what you want", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.login_post = async (req, res) => {
  res.send("Exisiting User");
};
