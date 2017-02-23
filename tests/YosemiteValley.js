var email = require( '../emailService.js' );
var moment =  require( 'moment' );
moment().format();
                                                              // Sun Jul 17 2016
var startDate = moment( "07-20-2016", "MM-DD-YYYY" ).format( 'ddd MMM DD YYYY' );
var nights = 2;

var yosemiteEmail = function() {
  var message = 'Found site at ';

  for ( var i = 0; i < foundSites.length; i++ ) {
    message += foundSites[ i ] + ',';
  }

  // trim last comma
  message = message.slice( 0, -1 );
  message += ' for ' + nights + ' night(s) starting on ' + startDate + '.';

  return email.sendEmail( 'Found Yosmite Campsite!', message );
};

var foundSites = [];

module.exports = {
  tags: [ "skip" ],
  "Available campsites in Yosemite Valley" : function (browser) {
    browser

    // Upper Pines
      // navigate to upper pines
      .url( 'http://www.reserveamerica.com/camping/upper-pines/r/campgroundDetails.do?contractCode=NRSO&parkId=70925' )
      .waitForElementVisible( 'body', 1000 )

      // enter dates and duration
      .setValue( '#campingDate', startDate )
      .setValue( '#lengthOfStay.ss', nights.toString() )
      .click( '#search_avail' )

      // check for availability
      .waitForElementPresent( 'div.matchSummary', 12000 )
      .getAttribute( 'div.matchSummary', 'textContent', function( result ) {
        if ( !result.value.match( /0 site\(s\) available/ ) ) {
          foundSites.push( 'Upper Pines' );
        }
      })

    // Lower Pines
      .url( 'http://www.reserveamerica.com/camping/lower-pines/r/campgroundDetails.do?contractCode=NRSO&parkId=70928' )
      .waitForElementVisible('body', 1000)
      .setValue( '#campingDate', startDate )
      .setValue( '#lengthOfStay.ss', nights.toString() )
      .click( '#search_avail' )
      .waitForElementPresent( 'div.matchSummary', 1000 )
      .getAttribute( 'div.matchSummary', 'textContent', function( result ) {
        if ( !result.value.match( /0 site\(s\) available/ ) ) {
          foundSites.push( 'Lower Pines' );
        }
      })

    // North Pines
      .url( 'http://www.reserveamerica.com/camping/north-pines/r/campgroundDetails.do?contractCode=NRSO&parkId=70927' )
      .waitForElementVisible('body', 1000)
      .setValue( '#campingDate', startDate )
      .setValue( '#lengthOfStay.ss', nights.toString() )
      .click( '#search_avail' )
      .waitForElementPresent( 'div.matchSummary', 1000 )
      .getAttribute( 'div.matchSummary', 'textContent', function( result ) {
        if ( !result.value.match( /0 site\(s\) available/ ) ) {
          foundSites.push( 'North Pines' );
        }

        if ( foundSites.length > 0 ) {
          yosemiteEmail()
          .then(function( success ) {
            console.log( 'Sent email.' );
          })
          .catch(function( error ) {
            console.error( 'Failed to send email:', error );
          });
        }
      })

      .end();
  }
};
