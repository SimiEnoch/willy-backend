const mongoose = require('mongoose');
const config = require('config');

const MONGODBURI = process.env.MONGODBURI || 'mongodb://localhost/willy'

module.exports = function () {
  mongoose
    .connect(MONGODBURI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Could not connect to MongoDB'));
};
