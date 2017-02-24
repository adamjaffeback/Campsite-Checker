var email = require( '../emailService.js' );

var sendMessage = function( message ) {
  return email.sendEmail( 'OSP Alert!', message );
};

var registrationLinkSelector = '#menu-item-1144 > a';
var waitForRegSelector = '#post-1142 > div > p:nth-child(2) > span';

module.exports = {
  '@tags': [ 'run' ],
  "Look for the OSP registration to become available." : function (browser) {
    browser
      // navigate to main page
      .url( 'http://oregonstarparty.org/' )
      .waitForElementVisible( 'body', 1000 )
      .resizeWindow(1000, 800)
      .isVisible(registrationLinkSelector, function( result ) {
        if ( result.value === false ) {
          console.log( 'Registration link selector has changed.' );
          sendMessage( 'Registration link selector has changed. Go, go, go!' );
        }
      })
      .getAttribute(registrationLinkSelector, 'href', function( result ) {
        if ( result.value !== 'http://oregonstarparty.org/registration-2/' ) {
          console.log( 'The registration link HREF changed.' );
          sendMessage( 'The registration link HREF changed. Go, go, go!' );
        }
      })
      .click( registrationLinkSelector )
      .isVisible(waitForRegSelector, function( result ) {
        if ( result.value === false ) {
          console.log( 'Check Back is no longer visible.' );
          sendMessage( 'Check Back is no longer visible. Go, go, go!' );
        }
      })
      .getText(waitForRegSelector, function( result ) {
        if ( result.value !== 'Please check back daily for details.' ) {
          console.log( 'Check Back language has changed.' );
          sendMessage( 'Check Back language has changed. Go, go, go!' );
        }
      })
      .end();
  }
};
