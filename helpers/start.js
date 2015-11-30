var tasks = require( './tasks' );
// db stuff
var env = process.env.NODE_ENV || 'local';
var port = process.env.PORT || 4321;
var config = require( '../config/config' )[ env ];
var mongoose = require( 'mongoose' );
mongoose.connect( config.mongo_uri );
var db = mongoose.connection;

exports.onServerListen = function() {
  console.log( 'Listening on port %s...', port );

  db.once('open', function() {
    console.log( 'Mongo successfully connected through mongoose.' );
    // run tests every 6 hours
    // 1000 * 60 - one minute
    // * 60 - sixty minutes, one hour
    // * 6 - 6 hours
    setTimeout(function() {
      tasks.runTests()
      .then(function( success ) {
        console.log( 'success', success );
      })
      .catch(function( error ) {
        console.log( 'error', error );
      })
    // }, ( 1000 * 60 * 60 * 6 ));
    }, ( 1000 * 10 ));

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
