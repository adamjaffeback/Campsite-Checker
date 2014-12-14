exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['specs.js'],
  onPrepare: function() {
    global.isAngularSite = function(flag) {
      browser.ignoreSynchronization = !flag;
    }     
  }
};