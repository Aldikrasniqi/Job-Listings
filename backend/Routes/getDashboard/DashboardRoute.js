const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');
// const { createUser, getUserByEmail } = require('../../services/user.service');

const {
  getFavorites,
  postFavorites,
  putFavorites,
  delFavorites,
} = require('../../controllers/FavoriteController.js');

// router.post('/login', (req, res) => {

// });
// router.get('/register', (req, res) => {
//   res.send('create an account!');
// });
// router.post('/register', async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     email,
//     password,
//     favorites,
//     role,
//     profileImage,
//   } = req.body;

//   const newUser = new User({
//     firstName,
//     lastName,
//     email,
//     password,
//     favorites,
//     role,
//     profileImage,
//   });

//   try {
//     await createUser(newUser);
//     res.status(200).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to register user' });
//   }
// });

router.route('/favorites').get(getFavorites).post(postFavorites);

router.route('/favorites/:id').put(putFavorites).delete(delFavorites);

router.get('/search', (req, res) => {});

router.get('/search/:id', (req, res) => {});

router.get('/search/:id/ingredients', (req, res) => {});
module.exports = router;
