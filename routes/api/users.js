const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Validator = require("validator");
const isEmpty = require("is-empty");
const auth = require("../../middleware/auth");

// setup body parser
router.use(express.json());

// aquire the j
const jwtSecret = process.env.jwt_secret;

// @POST to "/register"
// register route to handle all user registrations
router.post("/register", (req, res) => {
  let {name, email, password} = req.body;

  // convert empty fields to empty strings
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  name = !isEmpty(name) ? name : "";

  // username validation to check that it's not empty 
  if (Validator.isEmpty(name)) {
    return res.status(400).json({msg: "Username field cannot be empty"});
  }
  
  // username validation to check if the username is over a certa length
  if (!Validator.isLength(name, {min: 4})) {
    return res.status(400).json({msg: "Username must be more than 4 characters"});
  }

  // email validation to check if the field is empty or if it is a valid email
  if (Validator.isEmpty(email)) {
    return res.status(400).json({msg: "Email field cannot be empty"});
  } else if (!Validator.isEmail(email)) {
    return res.status(400).json({msg: "Please enter a valid email"});
  };

  // password validation to check if the field is empty
  if (Validator.isEmpty(password)) {
    return res.status(400).json({msg: "Password field cannot be empty"});
  };

  // password validation to check if it is over a certain length
  if (!Validator.isLength(password, {min: 4})) {
    return res.status(400).json({msg: "Password must be more than 4 characters"});
  };

  // check to see if the email already exists in the database
  User.findOne({email})
  .then(user => {
    if (user) return res.status(409).json({msg: "A user with that email already exists"});
    const newUser = new User({name, email, password})
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
        .then(user => {
          jwt.sign(
            {id: user.id},
            jwtSecret,
            {expiresIn: 3600},
            (err, token) => {
              res.json({token, user: {id: user.id, name: user.name, email: user.email, password: user.password}})
            }
          )
        });
      });
    });
  });
});

// @POST /login
// route to handle user logins
router.post("/login", (req, res) => {
  let {email, password} = req.body;

  // convert empty fields to empty strings
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  
  // validate that the email field is not empty and that the user entered a valid email
  if (Validator.isEmpty(email)) {
    return res.status(400).json({msg: "Email field cannot be empty"});
  } else if (!Validator.isEmail(email)) {
    return res.status(400).json({msg: "Please enter a valid email"});
  };

  // validate that the password field is not empty
  if (Validator.isEmpty(password)) {
    return res.status(400).json({msg: "Password field cannot be empty"});
  };

  // check if the email the user entered matches a user in the database
  User.findOne({email})
  .then(user => {
    if (!user) return res.status(404).json({msg: "A user with that email does not exist"});
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (!isMatch) return res.status(400).json({msg: "Incorrect password"})
        jwt.sign(
          {id: user.id},
          jwtSecret,
          {expiresIn: 3600},
          (err, token) => {
            res.json({token, user: {id: user.id, name: user.name, email: user.email, password: user.password}})
          }
        )
      })
  });
});

// route to get user data when the user logs in / registers
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("User does not exist");
    res.json(user);
  } catch(e) {
    res.status(400).json({msg: e.message});
  };
});

module.exports = router;