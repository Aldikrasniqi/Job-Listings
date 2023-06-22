const cheerio = require('cheerio');
const axios = require('axios');

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
        // console.log(response.data);
        // Find all the job elements on the page
        const jobElements = $('.container');

        // Extract only the h3 titles
        const titles = jobElements
          .map((index, element) => $(element).find('a').text())
          .get();

        // Output the extracted titles
        console.log('Job Titles:');
        console.log(titles);
        return titles;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  })
  .catch((error) => {
    console.error('Not connected to the internet');
  });
