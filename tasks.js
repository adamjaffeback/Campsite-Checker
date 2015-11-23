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
  .then(function() {
    return appendFile( 'runlog.txt', currentTime );
  })
  .catch(function( error ) {
    emailService.sendEmail( 'Error', 'There was an error running the tests. Visit the logs. ' + error );
  });
};

exports.resetLog = function() {
  var currentTime = new Date();
  currentTime = currentTime.toString() + ": Started new file\n";

  var readFile = Q.nfbind( fs.readFile );
  var writeFile = Q.nfbind( fs.writeFile );

  return readFile( 'runlog.txt', 'utf8' )
  .then(function( data ) {
    var message = 'I\'ve been working hard all week. Here\'s what I\'ve been up to:\n' + data;
    return emailService.sendEmail( 'Weekly Summary', message );
  })
  .then(function() {
    return writeFile( 'runlog.txt', currentTime );
  })
  .catch(function( error ) {
    emailService.sendEmail( 'Error Resetting Log', error );
  });
};