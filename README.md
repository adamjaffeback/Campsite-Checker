Campsite-Checker
================
[![Stories in Ready](https://badge.waffle.io/adam-back/Campsite-Checker.svg?label=ready&title=Ready)](http://waffle.io/adam-back/Campsite-Checker)

Use the Nightwatch.js end-to-end testing framework to check if campsites or permits have become available.

##Setup Local Environment
1. Clone repo to your computer.
2. Within the directory Campsite-Checker, run `npm install` from the terminal.
3. Download latest Selenium server from http://selenium-release.storage.googleapis.com/index.html
  - Click on the latest version
  - Click on selenium-server-standalone-(version number).jar
  - Move it to the repo.
4. Open the `nightwatch.json` file in the main directiory for editing.
  - Update line 13 with the name and path of your selenium server `.jar` file. 
  - Save.
5. Copy `nightwatch.json`.
6. Paste it over the default file in `node_modules/nightwatch/bin/`.

##Run Automatic Checks
Campsite Checker uses (forever)[https://github.com/foreverjs/forever] to run, well, forever, in the background of your computer.

1. Open your command line window to the root directory for `Campsite-Checker/`.
2. Run `forever start server.js`.

Inside server.js there is a simple loop which runs `npm test` every 10 minutes. It also appends the event to `runlog.txt` to confirm that the test ran.

To stop the tests, go back to the command line and root directory. Type `forever stop server.js`.

##Run Manual Checks
Within the `Campsite-Checker/` directory:
```bash
npm test
```
or
```bash
./nightwatch -t
```
##Writing Tests
See Nightwatch.js documentation: http://nightwatchjs.org/guide#usage

There are also examples in `node_modules/nightwatch/examples/tests/google/`.

##Todos
- [ ] Update README to include mandrill, etc.
- [ ] Update README to include forever
- [ ] Generalize code for other sites/locations/needs

