const jwt = require("jsonwebtoken");

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
          console.log(
            "🚀 ~ file: authMiddleware.js ~ line 15 ~ requireAuth ~ err",
            err.message
          );
          res.redirect("/login");
        } else {
          console.log(
            "🚀 ~ file: authMiddleware.js ~ line 14 ~ requireAuth ~ decodedToken",
            decodedToken
          );
          next();
        }
      }
    );
  } else {
    res.redirect("/");
  }
};

module.exports = { requireAuth };
