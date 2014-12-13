module.exports = {
  "Look for available cabins in Haleakala NP, Hawai'i" : function (browser) {
    browser
      .url("http://www.recreation.gov")
      .waitForElementVisible('body', 1000)
      .setValue('input[id=locationCriteria]', 'Haleakala National Park')
      .click('select[id=interest]')
      .waitForElementVisible('optgroup[label=Reservable Activities]', 250)
      .click('option[value=permit]')
      .submitForm('form[id=unifSearchForm]')
      .waitForElementVisible('body', 1000)
      .assert.elementPresent('a[title=Haleakala National Park (Cabin Permits)]')
      .end();
  }
};