var api_key = require('../Personal Info/mandrillKey.js').api_key;
var mandrill = require('mandrill-api');
mandrill_client = new mandrill.Mandrill(api_key);
var contactInfo = require('../Personal Info/personalContactInfo.js').contacts;

var sendMessage = function() {
  var message = {
      "html": "<span>Altra 75L Pack Available, search pro.arcteryx.com</span>",
      "subject": "Altra Pack 75L Available",
      "from_email": contactInfo.Adam.email,
      "from_name": "Pack Alert",
      "to": [{
              "email": contactInfo.Adam.phone,
              "name": contactInfo.Adam.name,
              "type": "to"
          },
          {
              "email": contactInfo.Adam.email,
              "name": contactInfo.Adam.name,
              "type": "to"
          }],
      "headers": {
          "Reply-To": ""
      },
      "important": true,
  };

  var async = false;

  mandrill_client.messages.send({"message": message, "async": async}, function(result) {
      console.log(result);
      /* Expected result
      [{
              "email": "recipient.email@example.com",
              "status": "sent",
              "reject_reason": "hard-bounce",
              "_id": "abc123abc123abc123abc123abc123"
          }]
      */
  }, function(e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });
};

module.exports = {
  tags: ['run'],
  "Look for pack availability at Arcteryx" : function (browser) {
    browser

      // navigate to main page
      .url('http://http://pro.arcteryx.com/')
      .waitForElementVisible('body', 1000)

      // log in
      .setValue( '#header > div > div > form > span:nth-child(2) > input[type="text"]', contactInfo.SAR.email )
      .setValue( '#header > div > div > form > span:nth-child(3) > input[type="password"]', contactInfo.SAR.password )
      .click( '#header > div > div > form > button' )

      // click beyond foot sizing page
      .click( '#btnOkay' )

      // click 'Outdoor Pro Product'
      .click( '#divOrderTypeOptions > div:nth-child(1) > a:nth-child(1) > img:nth-child(3)' )

      // enter in search and go
      .setValue( '#txtSearch', 'ALTRA 75 BACKPACK' )
      .click( '#btnSearch' )

      // check the src tag for 'out of stock'
      .getAttribute( '#divProduct > table > tbody > tr > td > div:nth-child(2) > a > img', 'src', function( result ) {
        if ( !result.value.match( /out-of-stock/ ) ) {
          sendMessage();
        } else {
          console.log( 'done' );
        }
      })
      .end();
  }
};
