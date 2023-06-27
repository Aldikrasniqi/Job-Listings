const responder = require('../Lib/baseResponses');
const cheerio = require('cheerio');
const axios = require('axios');
const User = require('../models/user.model');
const Job = require('../models/jobs.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const getFavorites = async (req, res) => {
  try {
    // get the token from frontend decode it and get the user id
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    // decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_ACCSES_TOKEN);
    console.log(decodedToken);
    // get the user id from the token
    const userId = decodedToken._id;
    console.log(userId);

    // Find the user by _id and populate the favorites field
    const user = await User.findById(userId).populate('favorites');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the favorites array
    const favorites = user.favorites;

    res.json({ favorites });
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
    // decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_ACCSES_TOKEN);
    console.log(decodedToken);
    // get the user id from the token
    const userId = decodedToken._id;
    console.log(userId);

    // find the user by _id
    const user = await User.findById(userId);
    console.log(user);

    // add the job to the user favorites
    user.favorites.push(job);
    console.log(user.favorites);
    // save the user
    await user.save();
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
const delFavorites = async (req, res) => {
  try {
    // Get the token from the frontend, decode it, and get the user id
    const token = req.headers.authorization.split(' ')[1];
    // Decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_ACCSES_TOKEN);
    // Get the user id from the token
    const userId = decodedToken._id;
    const jobId = req.params.id;
    console.log('userId:', userId);
    console.log('jobId:', jobId);

    const user = await User.findById(userId);
    console.log('user:', user);

    const character = await Job.findByIdAndDelete();
    console.log(character);
    res.json(responder.success(`Deleted user favorite ${req.params.id}`));
  } catch (error) {
    console.error('Error:', error);
    res.json(responder.fail(error));
  }
};

module.exports = {
  getFavorites,
  postFavorites,
  putFavorites,
  delFavorites,
};
