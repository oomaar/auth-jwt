const jwt = require("jsonwebtoken");
const User = require("../db/models/Users");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwtCallItWhatYouWantAndMakeItOneWord;

  // check jwt exists & verified
  // jwt.verify(token, secret, callback function)
  // N:B:- the secret must be the same as the one in authControlers => createToken function
  if (token) {
    jwt.verify(
      token,
      "this is the secret, this should be long and in a .env file",
      (err, decodedToken) => {
        if (err) {
          //   console.log(
          //     "🚀 ~ file: authMiddleware.js ~ line 15 ~ requireAuth ~ err",
          //     err.message
          //   );
          res.redirect("/login");
        } else {
          //   console.log(
          //     "🚀 ~ file: authMiddleware.js ~ line 14 ~ requireAuth ~ decodedToken",
          //     decodedToken
          //   );
          next();
        }
      }
    );
  } else {
    res.redirect("/login");
  }
};

// Check current user
const checkUser = (req, res, next) => {
  const token = req.jwt.jwtCallItWhatYouWantAndMakeItOneWord;

  if (token) {
    jwt.verify(
      token,
      "this is the secret, this should be long and in a .env file",
      async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          const user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
