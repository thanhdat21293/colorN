const express = require ('express');
const expressVue = require ('express-vue');
const app = express();
const bodyParser = require ("body-parser");
const path = require ('path');
const async = require ('async');
const elas = require ("./elastic/index");

const session = require('express-session');
const passport = require('passport');

app.use ('/public', express.static ('public'))

app.engine ('vue', expressVue);

app.set ('view engine', 'vue');

app.set ('views', path.join (__dirname, '/views'));

app.set ('vue', {
	componentsDir: path.join (__dirname, 'views', 'components'),
	defaultLayout : 'layout'
});

app.use (bodyParser.urlencoded ({
	extended: true
}));

app.use (bodyParser.json());

app.use(session({
    //set cookie expiration in ms
	//cookie: { maxAge: (2000*3000) },
  secret : "secret",
  unset: 'destroy',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

//------------passport --------------------
require('./models/passport')(passport);

//------------Set up router --------------------
require('./router/router')(app, passport);

app.listen(3000, () => {
	console.log('Express server listening on port 3000');
});