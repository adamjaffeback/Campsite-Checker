var mongoose = require( 'mongoose' );

var runSchema = mongoose.Schema({
  testName: String,
  time: Date,
  success: Boolean,
  finished: Boolean
});

module.exports = exports = mongoose.model( 'Run', runSchema );