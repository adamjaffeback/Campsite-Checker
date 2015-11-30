var mongoose = require( 'mongoose' );

var updateSchema = mongoose.Schema({
  // week, day
  period: String,
  time: Date,
  numberOfRuns: Number,
  numberOfSuccess: Number,
  numberOfEmail: Number,
  numberOfFailure: Number,
  finished: Boolean
});

modules.exports = exports = mongoose.model( 'Periodic Update', updateSchema );