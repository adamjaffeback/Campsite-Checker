var environment = 'local';
var config = require( '../Personal Info/personalContactInfo.js' )[ environment ];
// var mandrill = require( 'mandrill-api' );
// var mandrill_client = new mandrill.Mandrill( config.api_key );
var emailService = require( '../emailService' );

module.exports = {
  '@tags': ['skip'],
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
        emailService.sendEmail( 'Haleakala Cabin Available!', 'Cabin available now at http://www.recreation.gov/permits/Haleakala_National_Park_Cabin_Permits/r/wildernessAreaDetails.do?page=detail&contractCode=NRSO&parkId=112739.' );
      })
      .end();
  }
};
