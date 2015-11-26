var child_process = require( 'child_process' );
var fs = require( 'fs' );
var Q = require( 'q' );
var emailService = require( './emailService' );

exports.runTests = function() {
  var currentTime = new Date();
  currentTime = currentTime.toString() + "\n";

  var run = Q.nfbind( child_process.exec );
  var appendFile = Q.nfbind( fs.appendFile );

  return run( 'npm test' )
  // do away with below
  // have each test write to db
  .then(function() {
    return appendFile( __dirname + '/public/runlog.txt', currentTime );
  })
  .catch(function( error ) {
    emailService.sendEmail( 'Error', 'There was an error running the tests. Visit the logs. ' + error );
  });
};

exports.sendPeriodicUpdate = function() {
  var currentTime = new Date();
  currentTime = currentTime.toString();

  var readFile = Q.nfbind( fs.readFile );
  var writeFile = Q.nfbind( fs.writeFile );

  return readFile( __dirname + '/public/runlog.txt', 'utf8' )
  .then(function( data ) {
    var message = 'I\'ve been working hard all week. Here\'s what I\'ve been up to:\n' + data;
    return emailService.sendEmail( 'Weekly Summary', message );
  })
  .then(function() {
    return writeFile( __dirname + '/public/runlog.txt', currentTime );
  })
  .catch(function( error ) {
    emailService.sendEmail( 'Error Resetting Log', error );
  });
};