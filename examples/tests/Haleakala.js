module.exports = {
  "Look for available cabins in Haleakala NP, Hawai'i" : function (browser) {
    browser
      // .url("http://www.recreation.gov")
      // .waitForElementVisible('body', 1000)
      // .setValue('input[id=locationCriteria]', 'HALEAKALA NATIONAL PARK')
      // .click('select[id=interest]')
      // .click('option[value=permit]')
      // .submitForm('form[id=unifSearchForm]')
      // .waitForElementVisible('body', 1000)
      // .click('option[value=permit]')
      // .waitForElementVisible('body', 1000)
      // .click('a[id=suggestion_1_2751]')
      // .waitForElementVisible('body', 1000)
      // .click('#check_avail_panel_NRSO112739 a.first')
      .url('http://www.recreation.gov/permits/Haleakala_National_Park_Cabin_Permits/r/wildernessAreaDetails.do?page=detail&contractCode=NRSO&parkId=112739')
      .waitForElementVisible('body', 1000)
      .click('select[id=permitTypeId]')
      .click('option[value=\'1451140610\']')
      .waitForElementVisible('#entryStartDate', 5000)
      .setValue('input[id=entryStartDate]', '01/25/2015')
      .setValue('input[id=lengthOfStay]', '1')  
      .submitForm('form[id=unifSearchForm]')
      // .waitForElementVisible('body', 5000)
      .end();
  }
};