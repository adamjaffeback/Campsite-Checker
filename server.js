var tasks = require( './tasks' );
var Q = require( 'q' );
var emailService = require( './emailService' );
var logger = require( 'morgan' );

var express = require( 'express' );
var app = express();
var port = process.env.PORT || 3000;

app.use( logger( 'dev' ) );

var server = app.listen( port, function() {
  console.log( 'Listening on port %s...', server.address().port );
  // run tests every 6 hours
  // 1000 * 60 - one minute
  // * 60 - sixty minutes, one hour
  // * 6 - 6 hours
  setInterval(function() {
    tasks.runTests();
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

app.get( '*', function( req, res ) {
  res.sendFile( 'runlog.txt', { root: __dirname + '/public' } );
});


