var child_process = require( 'child_process' );
var fs = require( 'fs' );

exports.runTests = function() {
  var currentTime = new Date();
  currentTime = currentTime.toString() + "\n";

  fs.appendFile( 'runlog.txt', currentTime, function( error ) {
    if ( error ) {
      console.error( error );
    }
  });

  child_process.exec( 'npm test' );
};

exports.resetLog = function() {
  var currentTime = new Date();
  currentTime = currentTime.toString() + ": Started new file\n";

  fs.writeFile( 'runlog.txt', currentTime, function( error ) {
    if ( error ) {
      console.error( error );
    }
  });
};