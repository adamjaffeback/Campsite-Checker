var api_key = require('../Personal Info/mandrillKey.js').api_key;
var mandrill = require('mandrill-api');
mandrill_client = new mandrill.Mandrill(api_key);
var contactInfo = require('../Personal Info/personalContactInfo.js').contacts;

// Add two days to current date
var startDate = new Date();
startDate.setDate(startDate.getDate() + 2); 

// format correctly
var dd = startDate.getDate();
var mm = startDate.getMonth() + 1;
var y = startDate.getFullYear();

var formattedStartDate = mm + '/'+ dd + '/'+ y;

var sendMessage = function() {
  var message = {
      "html": "<span>Steep Ravine Available, search http://www.reserveamerica.com/camping/mount-tamalpais-sp/r/campgroundDetails.do?contractCode=CA&parkId=120063 with date: " + formattedStartDate + "</span>",
      "subject": "Steep Ravine Available",
      "from_email": contactInfo.Adam.email,
      "from_name": "Campsite Alerts",
      "to": [{
              "email": contactInfo.Adam.phone,
              "name": contactInfo.Adam.name,
              "type": "to"
          },
          {
              "email": contactInfo.Adam.email,
              "name": contactInfo.Adam.name,
              "type": "to"
          },
          {
              "email": contactInfo.Anna.phone,
              "name": contactInfo.Anna.name,
              "type": "to"
          },
          {
              "email": contactInfo.Anna.email,
              "name": contactInfo.Anna.name,
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
  "Look for available cabins at Steep Ravine, Mt. Tamalpais SP" : function (browser) {
    browser

      // navigate to main page
      .url('http://www.reserveamerica.com/camping/mount-tamalpais-sp/r/campgroundDetails.do?contractCode=CA&parkId=120063')
      .waitForElementVisible('body', 1000)

      // enter dates and flexibility
      .setValue('#campingDate.dateField', formattedStartDate)
      .setValue('#lengthOfStay.ss', '1')  
      .click('#campingDateFlex') // click dropdown, <select> element
      // .keys(['\uE015', '\uE015', '\uE006']) // (Firefox only) arrow down twice, enter 
      .click('#campingDateFlex > option:nth-child(3)') // 4 Month Flexibility

      // start filtering for cabins
      .click('#loop')
      // .keys(['\uE015', '\uE015', '\uE015', '\uE006']) // (Firefox only) arrow down three times, enter
      .click('#loop > option:nth-child(4)') // S Rav Cabins 1-10
      .click('#lookingFor')
      // .keys(['\uE015', '\uE015', '\uE015', '\uE015', '\uE006']) // (Firefox only) arrow down four times, enter
      .click('#lookingFor > option:nth-child(5)') // Cabins or lodgings
      .waitForElementVisible('#camping_10001_3012', 1000)
      .setValue('#camping_10001_3012.s.form-control', '2') // Occupants

      .submitForm('#unifSearchForm')

      // check for availability
      .waitForElementVisible('#calendar_view_switch', 5000)
      .waitForElementNotPresent('#colbody1 > div.alternativeSuggestion > div.msg.warning', 1000, true) 
      // if passes this point, site found, send message
      // otherwise, kill tests
      .waitForElementVisible('body', 1000, true, function() {
        sendMessage();
      })

      .end();
  }
};
