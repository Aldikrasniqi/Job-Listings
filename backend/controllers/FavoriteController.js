const getFavorites = (req, res) => {
  res.status(200).json({ message: 'get favorite ' });
};
const postFavorites = (req, res) => {
  res.status(200).json({ message: 'Favorites set' });
};
const putFavorites = (req, res) => {
  res.status(200).json({ message: `Favorites updating ${req.params.id}` });
};
const delFavorites = (req, res) => {
  res.status(200).json({ message: `deleting favorites ${req.params.id}` });
};
module.exports = {
  getFavorites,
  postFavorites,
  putFavorites,
  delFavorites,
};
