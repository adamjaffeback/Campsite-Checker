var environment = process.env.NODE_ENV || 'local';
var config = require( '../config/config' )[ environment ];
var mandrill = require( 'mandrill-api' );
var mandrill_client = new mandrill.Mandrill( config.api_key );
var Email = require( '../models/email_model.js' );
var Q = require( 'q' );

exports.sendEmail = function( subject, message, recipients ) {
  var deferred = Q.defer();

  var recipientList = [{
    "email": config.Adam.phone,
    "name": 'Adam',
    "type": "to"
  },
  {
    "email": config.Adam.email,
    "name": 'Adam',
    "type": "to"
  }];

  if ( recipients === 'both' ) {
    recipientList.push({
      "email": config.Anna.phone,
      "name": 'Anna',
      "type": "to"
    });

    recipientList.push({
      "email": config.Anna.email,
      "name": 'Anna',
      "type": "to"
    });
  }

  var contents = {
      'text': message,
      "subject": subject,
      "from_email": config.Adam.email,
      "from_name": "Campsite-Checker",
      "to": recipientList,
      "headers": {
          "Reply-To": ""
      },
      "important": true
  };

  var email = new Email( { to: recipientList, time: new Date(), reason: subject, message: message } );

  mandrill_client.messages.send( { "message": contents, "async": true }, function( result ) {
    email.success = true;
    email.save(function( error, savedEmail ) {
      if ( error ) {
        deferred.reject( 'Error saving email after successful send: ' + error );
      } else {
        deferred.resolve( savedEmail );
      }
    });
  }, function( error ) {
    var message = 'Error sending email: ' + error + '\n';
    email.success = false;
    email.save(function( saveError, savedEmail ) {
      if ( saveError ) {
        message += 'Error saving email to db: ' + saveError + '\n';
      }

      deferred.reject( message );
    });
  });

  return deferred.promise;
};