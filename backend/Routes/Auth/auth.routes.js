const express = require('express');
const authController = require('../../controllers/auth.controller');
const responder = require('../../Lib/baseResponses');
const validator = require('../../middleware/validators.middleware');

const router = express.Router();
router.post(
  '/register',
  validator.registerCheck,
  validator.validate,
  async (req, res) => {
    try {
      const result = await authController.register(req.body);
      res.json(responder.success(result));
    } catch (err) {
      res.json(responder.fail(err));
    }
  }
);

router.post(
  '/login',
  validator.loginCheck,
  validator.validate,
  async (req, res) => {
    try {
      const result = await authController.login(req.body);
      res.json(responder.success(result));
    } catch (err) {
      res.json(responder.fail(err));
    }
  }
);

router.get('/verify-account/:token', async (req, res) => {
  console.log('here');
  try {
    const result = await authController.verifyAccount(req.params.token);
    res.json(responder.success(result));
  } catch (err) {
    res.json(responder.fail(err));
  }
});

router.post(
  '/forgot-password-request',
  validator.forgotPasswordRequest,
  validator.validate,
  async (req, res) => {
    try {
      const result = await authController.sendResetPasswordLink(req.body.email);
      res.json(responder.success(result));
    } catch (err) {
      res.json(responder.fail(err));
    }
  }
);

router.post(
  '/reset-password',
  validator.resetPassword,
  validator.validate,
  async (req, res) => {
    try {
      const result = await authController.resetPassword(
        req.body.password,
        req.body.token
      );
      res.json(responder.success(result));
    } catch (err) {
      res.json(responder.fail(err));
    }
  }
);

module.exports = router;
