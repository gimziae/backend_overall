// @ts-check

const connect = require('./mongooseConnect');
const User = require('../models/mongooseUser');
const { default: mongoose } = require('mongoose');

connect(); // 접속

const mongooseDB = {
  getUser: async (userId) => {
    try {
      const findUser = await User.findOne({ id: userId });

      if (!findUser) return false;
      return findUser;
    } catch (err) {
      console.error(err);
      return { status: 'unexpected', err };
    }
  },
};

module.exports = mongooseDB;
