const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

// Signup Route
router.route("/signup") 
  .get(userController.renderSignUp)
  .post(wrapAsync(userController.signUp));

// Login Route
router.route("/login")
  .get(userController.renderLogin)
  .post(
    saveRedirectUrl, 
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), 
    userController.login
  );

// Logout Route
router.get("/logout", userController.logout); 
module.exports = router;
