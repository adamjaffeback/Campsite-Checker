var environment = process.env.NODE_ENV || 'local';
var config = require( '../config/config' )[ environment ];
var mandrill = require( 'mandrill-api' );
var mandrill_client = new mandrill.Mandrill( config.api_key );
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

  mandrill_client.messages.send( { "message": contents, "async": true }, function( result ) {
    deferred.resolve( result );
  }, function( error ) {
    deferred.reject( error );
  });

  return deferred.promise;
};