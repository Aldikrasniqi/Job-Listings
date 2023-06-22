const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const router = express.Router();

// Check network connectivity
router.get('/job-titles', (req, res) => {
  // Check network connectivity
  axios
    .head('https://jobs.telegrafi.com/')
    .then(() => {
      console.log('Successfully connected to the internet');

      // Make an HTTP GET request to the Frakton Careers page
      axios
        .get('https://jobs.telegrafi.com/')
        .then((response) => {
          const $ = cheerio.load(response.data);
          const jobElements = $('.container');
          const company = $('.puna-applications').text();
          // Extract only the h3 titles and remove '\n', 'ditë', 'mbetura', 'të', and numbers
          const titles = jobElements
            .map((index, element) => {
              const title = $(element)
                .find('a')
                .text()
                .replace(/\n/g, '')
                .trim();
              return title.replace(/ditë|mbetura|të|\d+/g, '').trim();
            })
            .get();

          // Send the extracted titles as a response
          console.log('Job Titles:');
          console.log(titles);
          console.log('Company:');
          console.log(company);
          res.send({ company });
        })
        .catch((error) => {
          console.error('Error:', error);
          res.status(500).send('Error occurred while fetching job titles');
        });
    })
    .catch((error) => {
      console.error('Not connected to the internet');
      res.status(500).send('Not connected to the internet');
    });
});

module.exports = router;
