const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  // attemp to get the token from the request headers
  const token = req.header("x-auth-token");

  // if there is no token, then authorisation is denied
  if (!token) res.status(401).json({msg: "No toke, access denied"});

  try {
    // verify that the token is valid
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.user = decoded;
    next()
  } catch(e) {
    res.status(400).json({msg: "Token in invalid"});
  }
}

module.exports = auth;