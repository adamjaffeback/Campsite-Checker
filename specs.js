describe('Haleakala Cabin Permits', function() {
  beforeEach(function() {
    isAngularSite(false);
  });

  it('should check if a space has become available', function() {
    browser.get('http://www.recreation.gov/permits/Haleakala_National_Park_Cabin_Permits/r/wildernessAreaDetails.do?page=detail&contractCode=NRSO&parkId=112739');
    element(By.id('permitTypeId')).click();
    element(By.id('permitTypeId')).all(By.tagName('option')).element(By.cssContainingText('option', 'Wilderness Cabin Permit'))
    expect(element(By.id('entranceType_label')).isPresent()).toBe(true);
  });
});