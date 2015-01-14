var child_process = require('child_process');
var fs = require('fs');

//run tests every 10 minutes (1000 * 60 * 10)
setInterval(function() {
  fs.appendFile
}, (1000 * 60 * 10));

var runTests = function() {
  var currentTime = new Date();

  fs.appendFile('runlog.txt', currentTime.toString(), function(error) {
    if(error) {
      console.error(error);
    }
  });

  child_process.exec('npm test');
};