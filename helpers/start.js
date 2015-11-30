var tasks = require( './tasks' );
// db stuff
var env = process.env.NODE_ENV || 'local';
var config = require( './config/config' )[ env ];
var mongoose = require( 'mongoose' );
mongoose.connect( config.mongo_uri );
var db = mongoose.connection;

exports.onServerListen = function() {
  console.log( 'Listening on port %s...', server.address().port );

  db.once('open', function() {
    console.log( 'Mongo successfully connected through mongoose.' );
    // run tests every 6 hours
    // 1000 * 60 - one minute
    // * 60 - sixty minutes, one hour
    // * 6 - 6 hours
    setInterval(function() {
      tasks.runTests();
    }, ( 1000 * 60 * 60 * 6 ));

    // reset logs every week
    // 1000 * 60 - one minute
    // * 60 - sixty minutes, one hour
    // * 24 - 24 hours
    // * 7 - 7 days
    setInterval(function() {
      tasks.resetLog();
    }, ( 1000 * 60 * 60 * 24 * 7 ));
  });

  db.on('error', console.error.bind( console, 'connection error:' ) );
};
