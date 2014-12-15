Campsite-Checker
================

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

##Run Checks
Within the `Campsite-Checker/` directory:
```bash
npm test
```
or
```bash
./nightwatch -t
```

##Creating Tests
See Nightwatch.js documentation: http://nightwatchjs.org/guide#usage

There are also examples in `node_modules/nightwatch/examples/tests/google/`.

##Todos
- [ ] Setup cron job
- [ ] Setup twilio for text messaging
- [ ] Generalize code for other sites/locations/needs

