const responder = require('../Lib/baseResponses');
const cheerio = require('cheerio');
const axios = require('axios');
const User = require('../models/user.model');
const Job = require('../models/jobs.model');
const getFavorites = async (req, res) => {
  try {
    // show all favorites
    const favorite = await Job.find();

    res.json(
      responder.success(
        favorite.map((favorite) => ({
          id: favorite._id,
          companies: favorite.companies,
          city: favorite.city,
          jobListExpires: favorite.jobListExpires,
        }))
      )
    );
    console.log('here');
  } catch (error) {
    res.json(responder.fail(error));
  }
};

const postFavorites = async (req, res) => {
  try {
    // Find the job that is being added
    const jobId = req.params.id;
    console.log(jobId);

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

    console.log(linkTexts[jobId]);
    console.log(cityTexts[jobId]);
    console.log(jobListExpiresTexts[jobId]);

    const job = new Job({
      companies: linkTexts[jobId],
      city: cityTexts[jobId],
      jobListExpires: jobListExpiresTexts[jobId],
    });

    // get the token from frontend decode it and get the user id
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);

    await job.save();
    res.json(responder.success(`Added user favorite ${req.params.id}`));
  } catch (error) {
    res.json(responder.fail(error));
  }
};

const putFavorites = (req, res) => {
  try {
    res.json(responder.success(`Updated user favorite ${req.params.id}`));
  } catch (error) {
    res.json(responder.fail(error));
  }
};
const delFavorites = (req, res) => {
  try {
    res.json(responder.success(`Deleted user favorite ${req.params.id}`));
  } catch (error) {
    res.json(responder.fail(error));
  }
};
module.exports = {
  getFavorites,
  postFavorites,
  putFavorites,
  delFavorites,
};
