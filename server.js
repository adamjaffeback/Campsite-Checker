var child_process = require('child_process');
var fs = require('fs');

//run tests every 6 hours (1000 * 60 * 10)
// 1000 * 60 - one minute
// * 60 - sixty minutes, one hour
// * 6 - 6 hours
setInterval(function() {
  runTests();
}, ( 1000 * 60 * 60 * 6 ));

var runTests = function() {
  var currentTime = new Date();
  currentTime = currentTime.toString() + "\n";

  fs.appendFile('runlog.txt', currentTime, function(error) {
    if(error) {
      console.error(error);
    }
  });

  child_process.exec('npm test');
};