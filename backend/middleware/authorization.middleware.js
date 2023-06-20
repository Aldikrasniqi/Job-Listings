const { InvalidToken } = require('../Lib/Errors');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const getTokenFromHeader = async (req) => {
  let token = req.headers.authorization;
  if (!token) {
    throw new InvalidToken();
  }
  token = token.split('Bearer ')[1];
  if (!token) {
    throw new InvalidToken();
  }
  jwt.verify(token, process.env.JWT_ACCSES_TOKEN);

  const decoded = jwt.decode(token);

  const user = await userService.getUserById(decoded._id);

  if (!user) {
    throw new InvalidToken();
  }

  return { decoded, user };
};

module.exports = {
  checkUserAuth: async (req, res, next) => {
    const { decoded } = await getTokenFromHeader(req);
    req.userID = decoded._id;
    next();
  },
  checkAdminAuth: async (req, res, next) => {
    const { decoded, user } = await getTokenFromHeader(req);

    if (user.role !== 'ADMIN') {
      throw new InvalidToken();
    }
    req.userID = decoded._id;
    next();
  },
};
