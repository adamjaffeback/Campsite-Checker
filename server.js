var logger = require( 'morgan' );
var express = require( 'express' );
var app = express();
var port = process.env.PORT || 4321;
var start = require( './helpers/start' );

app.use( logger( 'dev' ) );

var server = app.listen( port, start.onServerListen );
