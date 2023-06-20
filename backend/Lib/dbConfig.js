const mongoose = require('mongoose');
const userServices = require('../services/user.service');
const bcrypt = require('bcrypt');

module.exports = {
  connect: () => {
    mongoose.connect(process.env.MONGO_URI).then(async () => {
      console.log('Connection successful'); // Add this line
      const adminUsers = await userServices.getUsersByRole('ADMIN');
      if (!adminUsers.length) {
        const adminUser = {
          firstName: process.env.ADMIN_FIRST_NAME,
          lastName: process.env.ADMIN_LAST_NAME,
          password: bcrypt.hashSync(
            process.env.ADMIN_PASSWORD,
            parseInt(process.env.HASH_SALT)
          ),
          email: process.env.ADMIN_EMAIL,
        };
        userServices.createAdmin(adminUser);
      }
    });
  },
};
