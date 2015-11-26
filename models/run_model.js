var mongoose = require('mongoose');

var runSchema = mongoose.Schema({
  testName: String,
  time: Date,
  success: Boolean,
  finished: Boolean
});

modules.exports = exports = mongoose.model( 'Run', runSchema );