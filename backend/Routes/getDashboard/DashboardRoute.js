const express = require('express');

const authorizationMiddleware = require('../../middleware/authorization.middleware');
const router = express.Router();

const {
  getFavorites,
  postFavorites,
  putFavorites,
  delFavorites,
} = require('../../controllers/FavoriteController.js');

router
  .route('/favorites')
  .get(authorizationMiddleware.checkUserAuth, getFavorites)
  .post(authorizationMiddleware.checkUserAuth, postFavorites);

router
  .route('/favorites/:id')
  .post(postFavorites)
  .get(authorizationMiddleware.checkUserAuth, getFavorites)
  .put(authorizationMiddleware.checkUserAuth, putFavorites)
  .delete(authorizationMiddleware.checkUserAuth, delFavorites);

module.exports = router;
