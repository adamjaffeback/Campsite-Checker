module.exports = {
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
      .waitForElementVisible('body', 5000) // wait for availability page to load
      
      .end();
  }
};
