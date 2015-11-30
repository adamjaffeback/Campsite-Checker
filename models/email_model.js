var mongoose = require( 'mongoose' );

var emailSchema = mongoose.Schema({
  to: [ String ],
  time: Date,
  reason: String,
  message: String,
  success: Boolean
});

module.exports = exports = mongoose.model( 'Email', emailSchema );