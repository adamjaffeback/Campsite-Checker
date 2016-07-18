var environment = 'local';
var config = require( './Personal Info/personalContactInfo.js' )[ environment ];
var Q = require( 'q' );
var nodemailer = require( 'nodemailer' );
var options = {
    service: 'gmail',
    auth: {
        user: config.Adam.email,
        pass: config.Adam.pw
    }
};
var transporter = nodemailer.createTransport( options );

exports.sendEmail = function( subject, message, recipients ) {
  var recipientList = [ config.Adam.phone, config.Adam.email ];

  if ( recipients === 'both' ) {
    recipientList.push( config.Anna.phone );
    recipientList.push( config.Anna.email );
  }

  var mailOptions = {
    from: '"Campsite-Checker" <' + config.Adam.email + '>',
    to: recipientList,
    subject: subject,
    text: message,
    html: '<p>' + message + '</p>'
  };

  return Q.ninvoke( transporter, 'sendMail', mailOptions );
};