const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const router = express.Router();

// Check network connectivity
router.get('/job-titles', async (req, res) => {
  try {
    // Check network connectivity
    await axios.head('https://jobs.telegrafi.com/');
    console.log('Successfully connected to the internet');

    // Make an HTTP GET request to the Frakton Careers page
    const response = await axios.get('https://jobs.telegrafi.com/');
    const $ = cheerio.load(response.data);
    const jobElements = $('.container');
    const company = $('.puna-applications').text();
    const jobInfo = $('.job-info');
    // Extract only the h3 titles and remove '\n', 'ditë', 'mbetura', 'të', and numbers
    const titles = jobElements
      .map((index, element) => {
        const title = $(element).find('a').text().replace(/\n/g, '').trim();
        return title.replace(/ditë|mbetura|të|\d+/g, '').trim();
      })
      .get();

    // Save each title one by one (example implementation)
    for (const title of titles) {
      // Here you can perform the necessary logic to save each title
      console.log(`Saving title: ${title}`);
      // Example: Call a function to save the title in a database or perform any other operation
    }

    // Send the extracted titles as a response
    // console.log('Job Titles:');
    // console.log(titles);
    // console.log('Company:');
    // console.log(company);
    res.send({ company, titles });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error occurred while fetching job titles');
  }
});

module.exports = router;
