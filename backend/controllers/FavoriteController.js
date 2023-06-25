const responder = require('../Lib/baseResponses');

const getFavorites = async (req, res) => {
  try {
    res.json(responder.success(`Favorites for user ${req.params.id}`));
    console.log('here');
  } catch (error) {
    res.json(responder.fail(error));
  }
};

const postFavorites = (req, res) => {
  try {
    res.json(responder.success(`Favorites for user ${req.params.id}`));
    console.log('here');
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
