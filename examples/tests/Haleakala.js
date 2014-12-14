module.exports = {
  "Look for available cabins in Haleakala NP, Hawai'i" : function (browser) {
    browser

      .url('http://www.recreation.gov/permits/Haleakala_National_Park_Cabin_Permits/r/wildernessAreaDetails.do?page=detail&contractCode=NRSO&parkId=112739')
      .waitForElementVisible('body', 1000)
      .click('select[id=permitTypeId]')
      .waitForElementVisible('#permitTypeId option', 1000)
      // .moveToElement('select[id=permitTypeId]', 10, 10)
      // ^tried to hover
      // .waitForElementVisible('#permitTypeId option[value=1451140610]', 4000)
      // ^does not pass
      .click('option[value=1451140610]')
      // .click('select:nth-child(2)')
      // .click('select option[value=1451140610]')
      // .click('#permitTypeId option[value=1451140610]')
      // .click('#permitTypeId:nth-child(2)')
      .end();









      // after clicking on permit type:

      // .waitForElementVisible('#entryStartDate', 5000)
      // .setValue('input[id=entryStartDate]', '01/25/2015')
      // .setValue('input[id=lengthOfStay]', '1')  
      // .submitForm('form[id=unifSearchForm]')
      // .waitForElementVisible('body', 5000)
  }
};


// for main page:
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