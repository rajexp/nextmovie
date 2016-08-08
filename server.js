// server.js

var env = process.env;

if (!env['http_proxy']) return;

var localUrls = [
  'http://some-internal-url.mycompany.local',
];

var url    = require('url');
var tunnel = require('tunnel');
var proxy = url.parse(env['http_proxy']);

var tunnelingAgent = tunnel.httpsOverHttp({
  proxy: {
    host: proxy.hostname,
    port: proxy.port
  }
});

var https = require('https');
var http = require('http');

var oldhttpsreq = https.request;
https.request = function (options, callback) {

  if (localUrls.some(function (u) {
    return ~u.indexOf(options.host);
  })){
    return oldhttpsreq.apply(https, arguments);
  }

  options.agent = tunnelingAgent;
  return oldhttpsreq.call(null, options, callback);
};

var oldhttpreq = http.request;
http.request = function (options, callback) {

  if (localUrls.some(function (u) {
    return ~u.indexOf(options.host);
  })){
    return oldhttpreq.apply(http, arguments);
  }

  options.agent = tunnelingAgent;
  return oldhttpreq.call(null, options, callback);
};


// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch11' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
