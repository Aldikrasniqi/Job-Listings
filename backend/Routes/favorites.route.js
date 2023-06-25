const express = require('express');
const router = express.Router();
const responder = require('../Lib/baseResponses');
const authorizationMiddleware = require('../middleware/authorization.middleware');

router.post(
  '/add-to-favorites',
  authorizationMiddleware.checkUserAuth,
  async (req, res) => {
    try {
      // add to favorites

      res.json(responder.success('added to favorites'));
    } catch (err) {
      res.json(responder.fail(err));
    }
  }
);

module.exports = router;
