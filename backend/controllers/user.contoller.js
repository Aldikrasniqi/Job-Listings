const userService = require('../services/user.service');

module.exports = {
  updateProfileImage: async (userId, imageFile) => {
    return await userService.updateProfileImage(userId, imageFile.filename);
  },
};
