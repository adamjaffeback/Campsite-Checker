var mongoose = require( 'mongoose' );

var updateSchema = mongoose.Schema({
  // week, day
  period: String,
  time: Date,
  numberOfRuns: Number,
  numberOfSuccessRuns: Number,
  numberOfFailRuns: Number,
  numberOfSuccessEmails: Number,
  numberOfFailEmails: Number,
  finished: Boolean
});

modules.exports = exports = mongoose.model( 'periodicUpdate', updateSchema );
