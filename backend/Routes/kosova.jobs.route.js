const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const router = express.Router();

// Check network connectivity
router.get('/kosova-jobs', async (req, res) => {
  try {
    // Check network connectivity
    await axios.head('https://kosovajob.com/');
    console.log('Successfully connected to the internet');

    const response = await axios.get('https://kosovajob.com/');
    const $ = cheerio.load(response.data);

    const companies = $('.jobListTitle');
    const linkTexts = companies.get().map((company) => $(company).text());

    const city = $('.jobListCity');
    const cityTexts = city.get().map((city) => $(city).text());

    const jobListExpires = $('.jobListExpires');
    const jobListExpiresTexts = jobListExpires
      .get()
      .map((jobListExpires) => $(jobListExpires).text());

    res.send({
      linkTexts: linkTexts.slice(0, 15),
      cityTexts: cityTexts.slice(0, 15),
      jobListExpiresTexts: jobListExpiresTexts.slice(0, 15),
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error occurred while fetching job titles');
  }
});

module.exports = router;
