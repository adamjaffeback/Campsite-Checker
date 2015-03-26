var api_key = require('../Personal Info/mandrillKey.js').api_key;
var mandrill = require('mandrill-api');
mandrill_client = new mandrill.Mandrill(api_key);
var contactInfo = require('../Personal Info/personalContactInfo.js').contacts;

module.exports = {
  tags: ['skip'],
  "Look for available cabins in Haleakala NP, Hawai'i" : function (browser) {
    browser

      .url('http://www.recreation.gov/permits/Haleakala_National_Park_Cabin_Permits/r/wildernessAreaDetails.do?page=detail&contractCode=NRSO&parkId=112739')
      .waitForElementVisible('body', 1000)
      
      .click('select[id=permitTypeId]') // click dropdown, <select> element
      .keys(['\uE015', '\uE006']) // arrow down, enter
      .waitForElementVisible('#entryStartDate', 5000) // wait for other form options to show

      .setValue('input[id=entryStartDate]', '01/25/2015')
      .setValue('input[id=lengthOfStay]', '1')  
      .submitForm('form[id=unifSearchForm]')

      // Search for availability. If not found, kill tests
      .waitForElementVisible('table #calendar tbody tr td.a', 2000, true)
      // If found send message.
      .waitForElementVisible('body', 1000, true, function() {
        
        var message = {
            "html": "<span>Haleakala Available!</span>",
            "subject": "Haleakala Cabin Available!",
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
      })

      .end();
  }
};
