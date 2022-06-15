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

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json(errors);
  }
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.login_post = async (req, res) => {
  res.send("Exisiting User");
};
