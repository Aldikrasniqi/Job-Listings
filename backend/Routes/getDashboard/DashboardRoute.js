const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const router = express.Router();

const {
  getFavorites,
  postFavorites,
  putFavorites,
  delFavorites,
} = require('../../controllers/FavoriteController.js');

// router.get('/dashboard', (req, res) => {
//   axios
//     .get('https://jobs.telegrafi.com/')
//     .then((response) => {
//       const $ = cheerio.load(response.data);
//       const jobElements = $('.container');
//       const titles = jobElements
//         .map((index, element) => $(element).find('a').text())
//         .get();
//       res.json({ titles });
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.route('/favorites').get(getFavorites).post(postFavorites);

router.route('/favorites/:id').put(putFavorites).delete(delFavorites);

router.get('/search', (req, res) => {});

router.get('/search/:id', (req, res) => {});

router.get('/search/:id/ingredients', (req, res) => {});
module.exports = router;
