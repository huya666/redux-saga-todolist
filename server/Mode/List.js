const mongoose = require('mongoose');
const ListSchema = require('../Schema/Listschemas');
const List = mongoose.model('list', ListSchema);

module.exports = List;