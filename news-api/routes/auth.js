const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");
const User = require("../models/user");
const authController = require("../controllers/auth");
///auth/signup
router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email please enter a new one")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists !");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);
router.post('/login',authController.login);

module.exports = router;
