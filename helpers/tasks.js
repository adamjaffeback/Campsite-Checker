var child_process = require( 'child_process' );
var Q = require( 'q' );
var emailService = require( './emailService' );
var models = require( '../models' );

exports.runTests = function() {
  return Q.nfcall( child_process.exec, 'npm test' )
  .catch(function( error ) {
    emailService.sendEmail( 'Error', 'There was an error running the tests: ' + error );
  });
};

exports.sendPeriodicUpdate = function( period ) {
  var interval = new Date();

  if ( period === week ) {
    interval.setDate( interval.getDate() - 7 );
  } else {
    // day
    interval.setDate( interval.getDate() - 1 );
  }

  var update = new models.periodicUpdate( { period: period, time: new Date(), numberOfRuns: 0, numberOfSuccessRuns: 0, , numberOfFailRuns: 0, numberOfSuccessEmails: 0, numberOfFailEmails: 0 } );

  var query = models.Run.find({});
  query.where( 'time' ).gte( interval );
  query.select( 'success' );

  return Q.nfcall( query.exec )
  .then(function( recentRuns ) {
    update.numberOfRuns = recentRuns.length;
    for ( var i = 0; i < update.numberOfRuns; i++ ) {
      var oneRun = recentRuns[ i ];

      if ( oneRun.success ) {
        update.numberOfSuccessRuns++;
      } else {
        update.numberOfFailRuns++;
      }
    }

    var emailQuery = models.Email.count({});
    emailQuery.where( 'time' ).gte( interval );
    return Q.nfcall( emailQuery.exec );
  })
  .then(function( emailsSent ) {
    var numEmails = emailsSent.length;
    for ( var i = 0; i < numEmails; i++ ) {
      var email = emailsSent[ i ];

      if ( email.success ) {
        update.numberOfSuccesEmails++;
      } else {
        update.numberOfFailEmails++;
      }
    }

    var message = 'I\'ve been working hard all week. Here\'s what I\'ve been up to:\n' + update;
    return emailService.sendEmail( 'Weekly Summary', message );
  })
  .then(function() {
    update.finished = true;
    return Q.nfcall( update.save );
  })
  .catch(function( error ) {
    emailService.sendEmail( 'Error Sending Update', error );
  });
};