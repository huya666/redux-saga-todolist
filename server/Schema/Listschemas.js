const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listSchema = new Schema({
  title: String,
  finished: Boolean,
})

module.exports = listSchema;