var environment = process.env.NODE_ENV || 'local';
var config = require( '../config/config.js' )[ environment ];
var mandrill = require( 'mandrill-api' );
var mandrill_client = new mandrill.Mandrill( config.api_key );
var Run = require( '../models/run_model.js' );
var emailService = require( '../helpers/emailService' );

var runLog = new Run( { testName: 'Altra', time: new Date() } );

module.exports = {
  tags: [ 'run' ],
  "Look for pack availability at Arcteryx" : function (browser) {
    browser

      // navigate to main page
      .url( 'http://pro.arcteryx.com/' )
      .waitForElementVisible( 'body', 1000 )

      // log in
      .setValue( '#header > div > div > form > span:nth-child(2) > input[type="text"]', config.SAR.email )
      .setValue( '#header > div > div > form > span:nth-child(3) > input[type="password"]', config.SAR.password )
      .click( '#header > div > div > form > button' )

      // click beyond foot sizing page
      .waitForElementVisible( '#lblMessage', 1000 )
      .click( '#btnOkay' )

      // click 'Outdoor Pro Product'
      .waitForElementVisible( '#divPromotionLabel', 1000 )
      .click( '#divOrderTypeOptions > div:nth-child(1) > a:nth-child(1) > img:nth-child(3)' )

      // enter in search and go
      .waitForElementVisible( '#txtSearch', 1000 )
      .setValue( '#txtSearch', 'ALTRA 75 BACKPACK' )
      .click( '#btnSearch' )

      // confirm on correct page
      .waitForElementVisible( '#divProduct > span', 1000 )
      .getText( '#divProduct > span', function( result ) {
        if ( result.value !== 'ALTRA 75 BACKPACK MEN\'S' ) {
          runLog.success = false;
          emailService.sendMessage( 'Error with Arcteryx Test', 'Did not reach backpack page.' );
        }
      })

      // check the src tag for 'out of stock'
      .getAttribute( '#divProduct > table > tbody > tr > td > div:nth-child(2) > a > img', 'src', function( result ) {
        if ( !result.value.match( /out-of-stock/ ) ) {
          runLog.success = true;
          emailService.sendMessage( 'Altra 75L Pack Available', 'Altra 75L Pack Available, search pro.arcteryx.com.' );
        } else {
          runLog.success = false;
        }
      })
      .end(function() {
        runLog.finished = true;
        runLog.save(function( error, savedLog ) {
          if ( error ) {
            sendMessage( 'Error with Arcteryx test. Did not save run log: ' + error );
          } else {
            console.log( 'Done searching for Altra:', savedLog );
          }
        });
      });
  }
};
