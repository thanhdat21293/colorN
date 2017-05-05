const express = require ('express');
const expressVue = require ('express-vue');
const app = express();
const bodyParser = require ("body-parser");
const path = require ('path');
const async = require ('async');
const elas = require ("./elastic/index");

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

//------------Set up router --------------------
require('./router/router')(app);

app.listen(3000, () => {
	console.log('Express server listening on port 3000');
});