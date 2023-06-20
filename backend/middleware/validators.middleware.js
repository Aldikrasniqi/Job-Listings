const { check, validationResult } = require('express-validator');
const responder = require('../Lib/baseResponses.js');

module.exports = {
  registerCheck: [
    check('firstName', 'First Name cannot be empty').notEmpty(),
    check('lastName', 'Last Name cannot be empty').notEmpty(),
    check('email', 'Email not valid').notEmpty().isEmail(),
    check('password', 'Password is not strong enough').isStrongPassword(),
  ],
  loginCheck: [
    check('email', 'Email not valid').notEmpty().isEmail(),
    check('password', 'Password cannot be empty').notEmpty(),
  ],
  forgotPasswordRequest: [
    check('email', 'Email not valid').notEmpty().isEmail(),
  ],
  resetPassword: [
    check('password', 'Password is not strong enough').isStrongPassword(),
    check('token', 'Token not valid').notEmpty().isJWT(),
  ],
  validate: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.json(responder.fail(errors));
  },
};
