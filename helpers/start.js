var tasks = require( './tasks' );

exports.onServerListen = function() {
  console.log( 'Listening on port %s...', server.address().port );
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
};