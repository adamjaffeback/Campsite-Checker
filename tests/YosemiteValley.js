var moment =  require( 'moment' );
moment().format();
                                                              // Sun Jul 17 2016
var startDate = moment( "07-17-2016", "MM-DD-YYYY" ).format( 'ddd MMM DD YYYY' );
console.log( startDate );
var nights = 2;

module.exports = {
  tags: [ "run" ],
  "Available campsites in Yosemite Valley" : function (browser) {
    browser

    // Upper Pines
      // navigate to upper pines
      .url( 'http://www.reserveamerica.com/camping/upper-pines/r/campgroundDetails.do?contractCode=NRSO&parkId=70925' )
      .waitForElementVisible( 'body', 1000 )

      // enter dates and duration
      .setValue( '#campingDate', startDate )
      .setValue( '#lengthOfStay.ss', nights.toString() )
      .click( '#search_avail' )

      // check for availability
      .waitForElementVisible( '#colbody1 > div.searchSummary', 1000 )
      .getText( '#colbody1 > div.searchSummary', function( result ) {
        if ( !result.value.match( /0 site\(s\) available/ ) ) {
          // found site at Upper Pines
          console.log( 'Found site at Upper Pines.' );
        }
      })
      .end();

    // Lower Pines
      .url( 'http://www.reserveamerica.com/camping/lower-pines/r/campgroundDetails.do?contractCode=NRSO&parkId=70928' )
      .waitForElementVisible('body', 1000)
      .setValue( '#campingDate', startDate )
      .setValue( '#lengthOfStay.ss', nights.toString() )
      .click( '#search_avail' )
      .waitForElementVisible( '#colbody1 > div.searchSummary', 1000 )
      .getText( '#colbody1 > div.searchSummary', function( result ) {
        if ( !result.value.match( /0 site\(s\) available/ ) ) {
          // found site at Lower Pines
          console.log( 'Found site at Lower Pines.' );
        }
      })

    // North Pines
      .url( 'http://www.reserveamerica.com/camping/north-pines/r/campgroundDetails.do?contractCode=NRSO&parkId=70927' )
      .waitForElementVisible('body', 1000)
      .setValue( '#campingDate', startDate )
      .setValue( '#lengthOfStay.ss', nights.toString() )
      .click( '#search_avail' )
      .waitForElementVisible( '#colbody1 > div.searchSummary', 1000 )
      .getText( '#colbody1 > div.searchSummary', function( result ) {
        if ( !result.value.match( /0 site\(s\) available/ ) ) {
          // found site at Lower Pines
          console.log( 'Found site at Lower Pines.' );
        }
      })

      .end();
  }
};
