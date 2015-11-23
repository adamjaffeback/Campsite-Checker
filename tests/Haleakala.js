var environment = 'local';
var config = require( '../Personal Info/personalContactInfo.js' )[ environment ];
var mandrill = require( 'mandrill-api' );
var mandrill_client = new mandrill.Mandrill( config.api_key );

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
            "from_email": config.Adam.email,
            "from_name": "Campsite Alerts",
            "to": [{
                    "email": config.Adam.phone,
                    "name": 'Adam',
                    "type": "to"
                },
                {
                    "email": config.Adam.email,
                    "name": 'Adam',
                    "type": "to"
                },
                {
                    "email": config.Anna.phone,
                    "name": 'Anna',
                    "type": "to"
                },
                {
                    "email": config.Anna.email,
                    "name": 'Anna',
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
